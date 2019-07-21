module.exports = function(app) {

	/* Charset / Header conf / Filter */
	app.use('/', (req, resp, next) => {
		resp.setHeader("Content-Type", "application/json; charset=utf-8");
		resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		resp.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
		resp.setHeader("Access-Control-Allow-Origin", "*");
		next();
	});
}