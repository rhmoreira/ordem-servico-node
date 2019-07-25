var validarCategoria = (req, res, next) => {
  var categoria = req.body;
	var mensagens = [];
	
	if (!categoria) {
		mensagens.push("Categoria inválida");
	}

	if (!categoria.descricao || categoria.descricao.trim() == '') {
		mensagens.push("Descrição da Categoria é obrigatória");
	}

	if (mensagens.length > 0) {
    throw {messages: mensagens};
  } else {
    next();
  }
};

module.exports = validarCategoria;
