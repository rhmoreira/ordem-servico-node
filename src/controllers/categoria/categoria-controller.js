module.exports = (mongo, express, app) => {
	var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);

  var CategoriaController = {
    /* Listar */
    listar: (req, res) => {
      mongo.models.Categoria.find().then(categorias => res.json(categorias));
    },

    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
      basicCrudQuery
        .salvar(req.body, mongo.models.Categoria)
        .then((cat) => res.json({_id: cat._id}))
        .catch(err => next(err));
		},
		
		/* Excluir */
    excluir: async (req, res, next) => {
		var cExcId = req.params.idCategoria;
		var cSubId = req.params.idCategoriaSubstituta;
		var resultMsg = [];

		if (cSubId) {
			try {
				var cSub = await mongo.models.Categoria.findById(cSubId);

				var query = {categoria: mongo.mongoose.Types.ObjectId(cExcId)};
				var replace = {$set: {categoria: mongo.mongoose.Types.ObjectId(cSub._id)}};

				var result = await mongo.models.Produto.updateMany(query, replace);
				if (result.nModified > 0) resultMsg.push('Produtos alterados: ' + result.nModified);
				
				result = await mongo.models.Servico.updateMany(query, replace);
				if (result.nModified > 0) resultMsg.push('Serviços alterados: ' + result.nModified);

			} catch (error) {
				next(error);
				return;
			}
		}

		basicCrudQuery
		.excluir(cExcId, mongo.models.Categoria,
			(error, data) => {
				if (error != null) {
					next(error);
				} else {
					resultMsg.push('Categoria excluída');
					res.json({resultado: resultMsg});
				}
			}
		);
    }
  };

	var router = express.Router();
	
	var categoriaValidator = require('./salvar-categoria-validator.js');
	var deleteCategoriaValidator = require('./excluir-categoria-validator.js')(mongo);

  router.get("/", CategoriaController.listar);
  router.post("/", categoriaValidator, CategoriaController.salvar);
	router.put("/", categoriaValidator, CategoriaController.salvar);
	router.delete("/:idCategoria", deleteCategoriaValidator, CategoriaController.excluir);
	router.delete("/:idCategoria/:idCategoriaSubstituta", deleteCategoriaValidator, CategoriaController.excluir);

  app.use("/Categoria", router);
};
