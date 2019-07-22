module.exports = (mongo, express, app) => {
  var servicoQuery = require("../../mongo/query/servicos-query.js")(mongo);
	var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);

  var ServicoController = {
    /* Listar */
    listar: (req, res) => {	
			var descricao = req.query.descricao;
			var idCategoria = req.query.idCategoria;
			var query = {};

			if (descricao) {
				var descRegex = new RegExp('.*' + descricao + '.*');
				query.descricao = {$regex: descRegex, $options: 'i'}
			}
			idCategoria ? query.categoria = idCategoria : null;
			
      mongo.models.Servico.find(query).then(servicos => res.json(servicos));
    },

    /* Listar por categoria */
    listarPorCategoria: (req, res, next) => {
      mongo.models.Servico.find({
        categoria: req.params.idCategoria
      })
        .then(servicos => respond(servicos, res, next))
        .catch(err => next(err));
    },

    /* Listar por produto ID com tabela de preço */
    listarPorProdutoComTabelaPreco: (req, res, next) => {
      servicoQuery
        .listarPorProdutoComTabelaPreco(req.params.idProduto)
        .then(servicos => respond(servicos, res, next));
    },

    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
      basicCrudQuery
        .salvar(req.body, mongo.models.Servico)
        .then(ser => res.json({ _id: ser._id, __v: ser.__v }))
        .catch(err => next(err));
    }
  };

  function respond(values, res, next) {
		if (!values || values.length == 0) {
			var error = new Error("Nenhum serviço encontrado");
			error.statusCode = 404;
			next(error);
		} else {
			res.json(values);
		}
  }

  var router = express.Router();

  var servicoValidator = require("./salvar-servico-validator.js");

  router.get("/", ServicoController.listar);
  router.get("/Categoria/:idCategoria", ServicoController.listarPorCategoria);
  router.get("/Produto/:idProduto", ServicoController.listarPorProdutoComTabelaPreco);
  router.put("/", servicoValidator, ServicoController.salvar);
  router.post("/", servicoValidator, ServicoController.salvar);

  app.use("/Servico", router);
};
