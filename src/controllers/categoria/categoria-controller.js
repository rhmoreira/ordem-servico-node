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
    }
  };

	var router = express.Router();
	
	var categoriaValidator = require('./salvar-categoria-validator.js');

  router.get("/", CategoriaController.listar);
  router.post("/", categoriaValidator, CategoriaController.salvar);
  router.put("/", categoriaValidator, CategoriaController.salvar);

  app.use("/Categoria", router);
};
