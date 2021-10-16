import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateExchangeRateMutation extends GraphQLMutation<ExchangeRate, ExchangeRate> {
    mutation = `
    mutation createExchangeRate($value: Float) {
        createExchangeRate(insertData: {
            value: $value
        }) {
            id
            value
            createdAt
        }
    }
    `
}