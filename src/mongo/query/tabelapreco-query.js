module.exports = (mongo) => {

    var TabelaPrecoQuery = {
			/*###############################*/
        listarPorServicoEProduto: (idServico, idProduto) => {
            return mongo.models.TabelaPreco.find({"servico": idServico, "itens.produto": idProduto, "ativo": true});
				},
				
				/*###############################*/
				listar: (nome, idCategoria, idServico, idProduto, ativo) => {

					var matchCriteria = []; 
					if (nome) {
						var nomeRegex = new RegExp('.*' + nome + '.*');
						matchCriteria = matchCriteria.push({nome: nomeRegex})
					}

					if (idCategoria) {matchCriteria.push({"servicos.categoria": mongo.mongoose.Types.ObjectId(idCategoria)})};
					if (idServico) {matchCriteria.push({servico: mongo.mongoose.Types.ObjectId(idServico)})};
					if (idProduto) {matchCriteria.push({"itens.produto": mongo.mongoose.Types.ObjectId(idProduto)})};
					if (ativo && (ativo === "true" || ativo === "false")) {matchCriteria.push({ativo: new Boolean(ativo)})};

					
					var aggregate = [
						{
							"$lookup": {
								from: "servicos",
								localField: "servico",
								foreignField: "_id",
								as: "servicos"
							}
						}];

					if (matchCriteria.length > 0) {
						aggregate.push({"$match": {"$and": matchCriteria}});
					}
					aggregate.push({
							"$project": {
								"servicos": 0
							}
						});

					return mongo.models.TabelaPreco
						.aggregate(aggregate).then(tabelas => {
							return mongo.models.TabelaPreco.populate(tabelas, [{path: "servico"}, {path: "itens.produto"}]);
					});
										
				}
     }
    return module = TabelaPrecoQuery;

}