var validarTabelaPreco = (req, res, next) => {
  var tabelaPreco = req.body;
	var mensagens = [];
	
	if (!tabelaPreco) {
    mensagens.push('Tabela de preço inválida');
	}

	if (!tabelaPreco.nome || tabelaPreco.nome.trim() == '') {
    mensagens.push('Nome da Tabela de preço é obrigatório');
	}

  if (!tabelaPreco.servico) {
    mensagens.push('Serviço da Tabela de Preço é obrigatório');
	}

	if (!tabelaPreco.servico) {
    mensagens.push('Serviço da Tabela de Preço é obrigatório');
	}
	
	if (!tabelaPreco.itens || tabelaPreco.length == 0) {
    mensagens.push('Produtos da Tabela de Preço são obrigatórios');
  } else {
		tabelaPreco.itens.forEach( (item, index) => {
			if (!item.produto) {
				mensagens.push('O Item ' + (index+1) + ' não contém um produto');
			}

			if (!item.precoProduto || !item.precoServico ) {
				mensagens.push('O Item ' + (index+1) + ' não está totalmente precificado');
			}
		});
	}

  if (mensagens.length > 0) {
    throw new Error(mensagens);
  } else {
    next();
  }
};

module.exports = validarTabelaPreco;
