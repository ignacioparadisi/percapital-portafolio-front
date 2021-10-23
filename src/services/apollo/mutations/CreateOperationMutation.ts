import { InsertData } from "src/common/classes/InsertData";
import { Operation } from "src/common/classes/Operation";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateOperationMutation extends GraphQLMutation<InsertData<Operation>, Operation> {
    mutation = `
    mutation createOperation($insertData: OperationInput!) {
        createOperation(insertData: $insertData) {
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
            priceRV {
                id
                titleId
                closeDate
                closePrice
                createdAt
                bolivaresPrice
                exchangeRateId
                exchangeRate {
                    id
                    value
                }
                stockTitle {
                    symbol
                    name
                }
            }
        }
    }
    `
}