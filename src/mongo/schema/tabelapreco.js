module.exports = (mongoose) => {
  var TabelaPrecoSchema = new mongoose.Schema({
    nome: String,
    ativo: Boolean,
    servico: { type: mongoose.Schema.Types.ObjectId, ref: "Servico" },
    itens: [
      {
				precoProduto: Number,
				precoServico: Number,
        produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" }
      }
    ]
  },{
    versionKey: false
	});
	var TabelaPreco = mongoose.model("TabelaPreco", TabelaPrecoSchema);

  return module = TabelaPreco;
};
