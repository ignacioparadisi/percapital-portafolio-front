import { Apollo } from "apollo-angular";
import { Operation } from "src/common/classes/Operation";
import { Page } from "src/common/classes/Page";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetOperationsQuery extends GraphQLQuery<Page<Operation>, Page<Operation>> {
    findInCache = false;
    query = `
    query getOperations($limit: Int, $skip: Int, $where: OperationInput!) {
        getOperations(where: $where, limit: $limit, skip: $skip) {
            data {
                id
                userId
                priceRvId
                createdAt
                stockAmount
                stockPrice
                typeId
                operationType {
                    id
                    name
                }
                stockTitle {
                    id
                    symbol
                    isinCode
                    name
                }
                value
                comission
                iva
                register
                exchangeRate
    
                sellNetValue
                sellRawDollarValue
                sellDollarNetValue
    
                buyTotalCost
                buyUnitTotalPrice
                buyDollarTotalCost
                buyDollarUnitTotalPrice
                buyMarketPrice
                buyVariation
                buyMarketValue
                buyComissionPercentage
                buyIvaPercentage
                buyRegisterPercentage
                buyTotalIncome
                buyGpValue
                buyPerformanceValue
                buyWeightInWallet
                buyWeightedPerformance
                buyDollarGp
                buyDollarPerformanceValue
                buyDollarWeightedPerformance
            }
            total
        }
    }
    `
}