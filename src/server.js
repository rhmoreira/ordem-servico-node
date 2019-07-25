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
var serverPort = 8080;

app.use(express.json());

app.listen(serverPort, '0.0.0.0', function () {
  console.log('Example app listening on port ' + serverPort + '!');
});

/* Express Middleware */
require('./express-middleware.js')(app);

/* App Config */
var osApp = require('./app-config.js')(express);
app.use('/OS', osApp);

/* Error Handler */
app.use((err, req, res, next) => {
	if (!err.statusCode) { err.statusCode = 500 };
	switch (err.name) {
		case 'ValidationError':
			var messages = [];
			for (field in err.errors) {
				messages.push(err.errors[field].message);
			}
			err.message = messages;
			break;
	
		default:
			if (err.messages) {
				err.message = err.messages;
			}
			break;
	}
	res.status(err.statusCode).json({cause: err.message});
})
