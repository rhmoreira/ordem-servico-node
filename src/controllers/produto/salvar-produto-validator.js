var validarProduto = (req, res, next) => {
  var produto = req.body;
	var mensagens = [];
	
	if (!produto) {
		mensagens.push(" Produto inválido");
	}

	if (!produto.descricao || produto.descricao.trim() == '') {
		mensagens.push(" Descrição do Produto é obrigatório");
	}

	if (!produto.material || produto.material.trim() == '') {
		mensagens.push(" Material do Produto é obrigatório");
	}

  if (!produto.categoria || (!produto.categoria instanceof String && !produto.categoria._id)) {
    mensagens.push(" Categoria do produto é obrigatória");
  }

  if (mensagens.length > 0) {
    throw {messages: mensagens};
  } else {
    next();
  }
};

module.exports = validarProduto;
