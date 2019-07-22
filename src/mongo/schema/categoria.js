module.exports = (mongoose) => {
  var CategoriaSchema = new mongoose.Schema({
		descricao: String,
  },{
    versionKey: false
	});
  var Categoria = mongoose.model("Categoria", CategoriaSchema);

  return module = Categoria;
};
