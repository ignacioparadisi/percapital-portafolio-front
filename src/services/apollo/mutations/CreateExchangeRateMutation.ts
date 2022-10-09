import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateExchangeRateMutation extends GraphQLMutation<ExchangeRate, ExchangeRate> {
    mutation = `
    mutation createExchangeRate($value: Float, $createdAt: String) {
        createExchangeRate(insertData: {
            value: $value
            createdAt: $createdAt
        }) {
            id
            value
            createdAt
        }
    }
    `
}