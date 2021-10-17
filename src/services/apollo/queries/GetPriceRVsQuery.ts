import { Page } from "src/common/classes/Page";
import { PriceRV } from "src/common/classes/PriceRV";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetPriceRVsQuery extends GraphQLQuery<Page<PriceRV>, Page<PriceRV>> {
    query = `
    query getPriceRVs($limit: Int, $skip: Int) {
        getPriceRVs(limit: $limit, skip: $skip) {
            data {
                id
                titleId
                exchangeRateId
                closeDate
                closePrice
                bolivaresPrice
                createdAt
                latestExchangeRate
                exchangeRate {
                    id
                    value
                }
                stockTitle {
                    id
                    name
                    symbol
                }
            }
            total
        }
    }
    `;
}