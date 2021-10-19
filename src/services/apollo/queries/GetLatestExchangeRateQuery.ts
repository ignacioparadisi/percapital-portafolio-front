import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetLatestExchangeRateQuery extends GraphQLQuery<ExchangeRate, ExchangeRate> {
    query = `
    query getLatestExchangeRate {
        getLatestExchangeRate {
          id
          value
          createdAt
        }
    }
    `
}