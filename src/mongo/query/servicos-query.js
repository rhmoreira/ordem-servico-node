module.exports = (mongo) => {

    var ServicosQuery = {
        listarPorProdutoComTabelaPreco: (produtoId) => {
            var resultadoPromise = 
            mongo.models.Servico.aggregate([{
                $lookup: {
                    from: "tabelaprecos",
                    localField: "_id",
                    foreignField: "servico",
                    as: "servicos"
                }
            },{
                $match: {
                    "servicos.itens.produto": mongo.mongoose.Types.ObjectId(produtoId)
                }
            },{
                $project: {
                    "servicos": 0
                }
            }]).exec();

            return resultadoPromise;
        }
    };

    return module = ServicosQuery;

}