var mongoose = require('mongoose');

var mongoUrl = 'ds155653.mlab.com';
var mongoPort = '55653';
var mlabConnString = `mongodb://angelo:angelo1234@${mongoUrl}:${mongoPort}/angelo`

exports.configure = function configure() {
    console.log(`Conectando com [${mongoUrl}] em [${mongoPort}]...`);
    mongoose.connect(mlabConnString, { useNewUrlParser: true });
    console.log('Conectado!');
}

exports.getCollection = function database(collectionName) {
    return mongoose.connection.db.collection(collectionName);
}

mongoose.connection.on('disconnected', function () {
    console.log('Conexão fechada.');
});

module.exports.mongoose = mongoose;
module.exports.models = require('./schema/schemas.js')(mongoose);
