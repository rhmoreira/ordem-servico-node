module.exports = (mongo) => {
  var Crud = {
    salvar: (obj, modelRef) => {
      var modelRefInstance = new modelRef(obj);
      if (obj._id) modelRefInstance.isNew = false;

      return modelRefInstance.save();
		},
		
		excluir: (id, modelRef, callback) => {
			modelRef.findByIdAndDelete(id, callback);
    }
	};
	
	return module = Crud;
};
