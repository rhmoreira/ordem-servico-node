module.exports = (mongoose) => {
  var categoria = require("./categoria.js")(mongoose);
  var protudo = require("./produto.js")(mongoose);
  var servico = require("./servico.js")(mongoose);
  var tabelaPreco = require("./tabelapreco.js")(mongoose);

  return (module = {
    Categoria: categoria,
    Produto: protudo,
    Servico: servico,
    TabelaPreco: tabelaPreco
  });
};
