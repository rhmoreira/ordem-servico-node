module.exports = (mongo, express, app) => {
	var basicCrudQuery = require("../../mongo/query/basic-crud-query.js")(mongo);

  var TipoController = {
    /* Listar */
    listar: (req, res) => {
      mongo.models.Tipo.find().then(tipos => res.json(tipos));
    },
    /* Salvar/Atualizar */
    salvar: (req, res, next) => {
      basicCrudQuery
        .salvar(req.body, mongo.models.Tipo)
        .then(tipo => res.json({ _id: tipo._id, __v: tipo.__v }))
        .catch(err => next(err));
    }
  };

  var router = express.Router();

  router.get("/", TipoController.listar);
  router.post("/", TipoController.salvar);
  router.put("/", TipoController.salvar);

  app.use("/Tipo", router);
};
