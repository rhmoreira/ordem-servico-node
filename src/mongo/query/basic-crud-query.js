module.exports = (mongo) => {
  var Crud = {
    salvar: (obj, modelRef) => {
      var modelRefInstance = new modelRef(obj);
      if (obj._id) modelRefInstance.isNew = false;

      return modelRefInstance.save();
    }
	};
	
	return module = Crud;
};
