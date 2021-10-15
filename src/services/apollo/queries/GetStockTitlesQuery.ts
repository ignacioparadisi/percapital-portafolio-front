import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { Page } from "src/common/classes/Page";

export class GetStockTitlesQuery extends GraphQLQuery<Page<StockTitle>, StockTitle[]> {
    query = `
    query getStockTitles($limit: Int, $skip: Int) {
        getStockTitles(
            limit: $limit,
            skip: $skip
        ) {
            id
            name
            symbol
            createdAt
        }
    }
    `;
}