module.exports = (mongo, express, app) => {
  var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);
  var produtosQuery = require("../../mongo/query/produto-query.js")(mongo);

  var ProdutoController = {
    /* Listar */
    listar: async (req, res, next) => {
      try {
        var descricao = req.query.descricao;
        var idCategoria = req.query.idCategoria;
      
        var produtos = await basicCrudQuery.listPorDescricaoECategoria(descricao, idCategoria, mongo.models.Produto);
        res.json(produtos);
      }catch (error){
        next(error);
      }
    },

    /* Listar por Categoria*/
    listarPorCategoria: (req, res) => {
      produtosQuery
        .listarPorCategoriaETipo(req.params.idCategoria)
        .then(produtos => res.json(produtos));
    },

    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
			var produto = req.body;
			
			basicCrudQuery
				.salvar(produto, mongo.models.Produto)
				.then(prod => res.json({_id: prod._id}))
				.catch(err => next(err));
    }
  };

  var router = express.Router();

	var validadorProduto = require('./salvar-produto-validator.js');

  router.get("/", ProdutoController.listar);
  router.get("/Categoria/:idCategoria", ProdutoController.listarPorCategoria);
	router.post("/", validadorProduto, ProdutoController.salvar);
	router.put("/", validadorProduto, ProdutoController.salvar);

  app.use("/Produto", router);
};
