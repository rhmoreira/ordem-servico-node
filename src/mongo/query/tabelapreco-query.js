module.exports = (mongo) => {

    var TabelaPrecoQuery = {
        listarPorServicoEProduto: (idServico, idProduto) => {
            return mongo.models.TabelaPreco.find({"servico": idServico, "itens.produto": idProduto, "ativo": true});
        }
     }
    return module = TabelaPrecoQuery;

}