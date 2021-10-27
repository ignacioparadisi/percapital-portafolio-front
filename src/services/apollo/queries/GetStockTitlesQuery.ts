import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { Page } from "src/common/classes/Page";

export class GetStockTitlesQuery extends GraphQLQuery<Page<StockTitle>, Page<StockTitle>> {
    findInCache = false;
    query = `
    query getStockTitles($limit: Int, $skip: Int, $where: StockTitleInput) {
        getStockTitles(
            limit: $limit,
            skip: $skip,
            where: $where
        ) {
            data {
                id
                name
                symbol
                createdAt
            }
            total
        }
    }
    `;
}