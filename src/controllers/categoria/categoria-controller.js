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
        .then((cat) => res.json({_id: cat._id,  __v: cat.__v }))
        .catch(err => next(err));
		},
		
		/* Excluir */
    excluir: async (req, res, next) => {
			var cSubId = req.params.idCategoriaSubstituta;
			var cExcId = req.params.idCategoria;

			if (cSubId) {
				try {
					var cSub = await mongo.models.Categoria.find({_id: cSubId});
					await mongo.models.Produto.updateMany({categoria: cExcId}, {categoria: mongo.mongoose.Types.ObjectId(cSub._id)});
					await mongo.models.Servico.updateMany({categoria: cExcId}, {categoria: mongo.mongoose.Types.ObjectId(cSub._id)});
				} catch (error) {
					next(error);
				}
			}

			basicCrudQuery
			.excluir(cExcId, mongo.models.Categoria,
				(error, data) => {
					if (error != null) {
						next(error);
					} else {
						res.json({resultado: [200, 202, 204]});
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
