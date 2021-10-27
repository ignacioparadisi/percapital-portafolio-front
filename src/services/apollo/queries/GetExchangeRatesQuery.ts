import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { Page } from "src/common/classes/Page";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetExchangeRatesQuery extends GraphQLQuery<Page<ExchangeRate>, Page<ExchangeRate>> {
    findInCache = false;
    query = `
    query getExchangeRates($limit: Int, $skip: Int) {
        getExchangeRates(limit: $limit, skip: $skip) {
            data {
                id
                value
                createdAt
            }
            total
        }
    }
    `
}