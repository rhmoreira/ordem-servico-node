module.exports = (mongoose) => {
  var ServicoSchema = new mongoose.Schema({
		descricao: String,
		categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  },{
    versionKey: false
	});
  var Servico = mongoose.model("Servico", ServicoSchema);

  return module = Servico;
};
