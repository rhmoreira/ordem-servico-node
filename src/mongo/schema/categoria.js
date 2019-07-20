module.exports = (mongoose) => {
  var CategoriaSchema = new mongoose.Schema({
		descricao: String,
  });
  var Categoria = mongoose.model("Categoria", CategoriaSchema);

  return module = Categoria;
};
