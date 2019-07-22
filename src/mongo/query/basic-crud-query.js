module.exports = (mongo) => {
  var Crud = {
    salvar: (obj, modelRef) => {
      var modelRefInstance = new modelRef(obj);
      if (obj._id) modelRefInstance.isNew = false;

      return modelRefInstance.save();
		},
		
		excluir: (id, modelRef, callback) => {
			modelRef.findByIdAndDelete(id, callback);
    },

    listPorDescricaoECategoria: (descricao, idCategoria, modelRef) => {
      var query = {};
      if (descricao) {
				var descRegex = new RegExp('.*' + descricao + '.*');
				query.descricao = {$regex: descRegex, $options: 'i'}
			}
			idCategoria ? query.categoria = idCategoria : null;
      
      return modelRef.find(query).populate('categoria');
    }
	};
	
	return module = Crud;
};
