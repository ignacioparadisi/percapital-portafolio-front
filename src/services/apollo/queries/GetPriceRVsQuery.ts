import { Page } from "src/common/classes/Page";
import { PriceRV } from "src/common/classes/PriceRV";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetPriceRVsQuery extends GraphQLQuery<Page<PriceRV>, Page<PriceRV>> {
    findInCache = false;
    query = `
    query getPriceRVs($limit: Int, $skip: Int, $where: PriceRVInput) {
        getPriceRVs(limit: $limit, skip: $skip, where: $where) {
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