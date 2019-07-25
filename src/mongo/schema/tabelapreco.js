module.exports = (mongoose) => {
  var TabelaPrecoSchema = new mongoose.Schema({
    nome: {type: String, required: [true, 'Nome é obrigatório']},
    ativo: Boolean,
    itens: [
			{
				servico: { type: mongoose.Schema.Types.ObjectId, ref: "Servico", required: [true, 'Serviço é obrigatório'] },
				precoProduto: {type: Number, required: [true, 'Preço do material é obrigatório']},
				precoServico: {type: Number, required: [true, 'Preço da mão de obra é obrigatório']},
        produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: [true, 'Produto é obrigatório'] }
      }
    ]
  },{
    versionKey: false
	});
	var TabelaPreco = mongoose.model("TabelaPreco", TabelaPrecoSchema);

  return module = TabelaPreco;
};
