var validarServico = (req, res, next) => {
  var servico = req.body;
	var mensagens = [];
	
  if (!servico.categoria) {
    mensagens.push("Categoria do servico é obrigatória");
  }

  if (mensagens.length > 0) {
    throw new Error(mensagens);
  } else {
    next();
  }
};

module.exports = validarServico;
