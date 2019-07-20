module.exports = (mongoose) => {
  var TipoSchema = new mongoose.Schema({
		descricao: String,
		categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  });
  var Tipo = mongoose.model("Tipo", TipoSchema);

  return module = Tipo;
};
