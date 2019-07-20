/* Exit */
process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});

process.on("SIGTERM ", function() {
  console.log("\nGracefully shutting down from SIGTERM");
  process.exit();
});

var express = require('express');
var app = express();

app.use(express.json());
app.listen(4200, function () {
  console.log('Example app listening on port 4200!');
});

/* Express Middleware */
require('./express-middleware.js')(app);

/* App Config */
require('./app-config.js')(express, app);

/* Error Handler */
app.use((err, req, res, next) => {
  if (!err.statusCode) { err.statusCode = 500 };
  var errorName = err.name;
	switch (errorName) {
		case 'VersionError':
			next(new Error('Registro desatualizado. Por favor, pesquise novamente.'));
			break;
		default:
			next(err);
			break;
	}
  res.status(err.statusCode).json({erro: err.message});
})
