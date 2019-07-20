module.exports = function(express, app) {

	var mongo = require('./mongo/mongo-conf.js');

	mongo.configure();

	/* Controllers */
	require('./controllers/categoria/categoria-controller.js')(mongo, express, app);/* Categoria */
	require('./controllers/tipo/tipo-controller.js')(mongo, express, app);/* Tipo */
	require('./controllers/tabela-preco/tabela-preco-controller.js')(mongo, express, app);/* Tabela de Preço */
	require('./controllers/servico/servico-controller.js')(mongo, express, app);/* Serviços */
	require('./controllers/produto/produto-controller.js')(mongo, express, app);/* Produtos */
}

