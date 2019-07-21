module.exports = (mongo) => {

	var validarCategoria = async (req, res, next) => {
		var idCategoria = req.params.idCategoria;
		var idCategoriaSubstituta = req.params.idCategoriaSubstituta;

		if (!idCategoria) {
			throw new Error('A categoria a ser excluída deve ser informada');
		} else {
			if (!idCategoriaSubstituta) {
				validarCategoriaParaExclusao(idCategoria, next);
			} else {
				next();
			}
		}
	};

	async function validarCategoriaParaExclusao(idCategoria, next) {
		var servico = mongo.models.Servico;
		var produto = mongo.models.Produto;

		var errorCode = 'CAT_IN_USE';
		try {
			var validoParaExclusao = true;
			var erro;

			await servico.countDocuments({categoria: idCategoria}, (e, count) => {
				if (e) erro = e;
				
				validoParaExclusao = count === 0;
			});
			await produto.countDocuments({categoria: idCategoria}, (e, count) => {
				if (e) erro = e;
				validoParaExclusao = count === 0;
			});
			
			if (erro) {
				next(erro)
			} else if (validoParaExclusao) {
				next();
			} else {
				erro = new Error('Categoria em uso');
				next(erro);
			}
		} catch (e) {
			next(e);
		}
	}


	return module = validarCategoria;
}
