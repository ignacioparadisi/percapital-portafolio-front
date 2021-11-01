import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";

export class QueryStockTitlesWithAmountQuery extends GraphQLQuery<StockTitle, StockTitle[]> {
    query = `
    query getStockTitlesWithAmount {
        getStockTitlesWithAmount {
            id
            name
            symbol
            isinCode
            stockAmount
            createdAt
        }
    }
    `
}