import { InsertData } from "src/common/classes/InsertData";
import { PriceRV } from "src/common/classes/PriceRV";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreatePriceRVMutation extends GraphQLMutation<InsertData<PriceRV>, PriceRV> {

    mutation = `
    mutation createPriceRV($insertData: PriceRVInput!) {
        createPriceRV(insertData: $insertData) {
            id
            titleId
            exchangeRateId
            bolivaresPrice
            closeDate
            closePrice
            createdAt
        }
    }
    `
}