var validarProduto = (req, res, next) => {
  var produto = req.body;
	var mensagens = [];
	
	if (!produto) {
		mensagens.push("Produto inválido");
	}

	if (!produto.descricao || produto.descricao.trim() == '') {
		mensagens.push("Descrição do Produto é obrigatório");
	}

	if (!produto.material || produto.material.trim() == '') {
		mensagens.push("Material do Produto é obrigatório");
	}

  if (!produto.tipo) {
    mensagens.push("Tipo do produto é obrigatório");
  }
  if (!produto.categoria) {
    mensagens.push("Categoria do produto é obrigatória");
  }

  if (mensagens.length > 0) {
    throw new Error(mensagens);
  } else {
    next();
  }
};

module.exports = validarProduto;
