module.exports = function(mongo, express, app) {
  var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);
	var tabelaPrecoQuery = require("../../mongo/query/tabelapreco-query.js")(mongo);

  var TabelaPrecoController = {
    /* Listar */
    listar: (req, res, next) => {
			var ativo = req.query.ativo;
			var query = {}; 
			if (ativo != null) {query = {ativo: ativo}};

      mongo.models.TabelaPreco.find(query).then(tabelas => res.json(tabelas));
    },

    /* Listar Servico & Produto*/
    listarPorServicoEProduto: (req, res) => {
      tabelaPrecoQuery
        .listarPorServicoEProduto(req.params.idServico, req.params.idProduto)
        .then(tabelasPreco => {
          res.json(tabelasPreco);
        });
    },

    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
      basicCrudQuery
        .salvar(req.body, mongo.models.TabelaPreco)
        .then(tb => res.json({ _id: tb._id, __v: tb.__v }))
				.catch(err => next(err));
    }
  };

	var router = express.Router();
	
	var tabelaPrecoValidator = require('./salvar-tabela-preco-validator.js');

  router.get("/", TabelaPrecoController.listar);
  router.post("/", tabelaPrecoValidator, TabelaPrecoController.salvar);
  router.put("/", tabelaPrecoValidator, TabelaPrecoController.salvar);
  router.get("/:idServico/:idProduto", TabelaPrecoController.listarPorServicoEProduto);

  app.use("/TabelaPreco", router);
};
