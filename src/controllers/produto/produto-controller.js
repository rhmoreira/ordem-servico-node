module.exports = (mongo, express, app) => {
  var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);
  var produtosQuery = require("../../mongo/query/produto-query.js")(mongo);

  var ProdutoController = {
    /* Listar */
    listar: (req, res) => {
      mongo.models.Produto.find().then(produtos => res.json(produtos));
    },

    /* Listar por Categoria*/
    listarPorCategoria: (req, res) => {
      produtosQuery
        .listarPorCategoriaETipo(req.params.idCategoria)
        .then(produtos => res.json(produtos));
    },

    /* Listar por Categoria e Tipo*/
    listarPorCategoriaETipo: (req, res) => {
      produtosQuery
        .listarPorCategoriaETipo(req.params.idCategoria, req.params.idTipo)
        .then(produtos => res.json(produtos));
    },

    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
			var produto = req.body;
			
			basicCrudQuery
				.salvar(req.body, mongo.models.Produto)
				.then(prod => res.json({_id: prod._id, __v: prod.__v}))
				.catch(err => next(err));
    }
  };

  var router = express.Router();

	var validadorProduto = require('./salvar-produto-validator.js');

  router.get("/", ProdutoController.listar);
  router.get("/Categoria/:idCategoria", ProdutoController.listarPorCategoria);
  router.get("/Categoria/:idCategoria/Tipo/:idTipo", ProdutoController.listarPorCategoriaETipo);
	router.post("/", validadorProduto, ProdutoController.salvar);
	router.put("/", validadorProduto, ProdutoController.salvar);

  app.use("/Produto", router);
};
