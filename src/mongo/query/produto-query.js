module.exports = (mongo) => {

    var ProdutosQuery = {
        listarPorCategoriaETipo: (idCategoria, idTipo) => {
            
            var query = {};
            if (idCategoria != null) query.categoria = idCategoria;
            if (idTipo != null) query.tipo = idTipo;
            
            return mongo.models.Produto.find(query);
        }
    };

    return module = ProdutosQuery;

}