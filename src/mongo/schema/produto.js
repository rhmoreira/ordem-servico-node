module.exports = (mongoose) => {
  var ProdutoSchema = new mongoose.Schema({
    descricao: String,
    material: String,
		tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo" },
		categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },

    dimensoes: {
      largura: Number,
      comprimento: Number,
      altura: Number
    }
  });
  var Produto = mongoose.model("Produto", ProdutoSchema);

  return module = Produto;
};
