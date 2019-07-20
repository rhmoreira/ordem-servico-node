module.exports = function(app) {

	/* Charset Filter */
	app.use('/', (req, resp, next) => {
		resp.setHeader("Content-Type", "application/json; charset=utf-8");
		next();
	});
}