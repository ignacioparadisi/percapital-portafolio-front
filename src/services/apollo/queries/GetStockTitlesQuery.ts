import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { gql } from 'apollo-angular';
import { Page } from "src/common/classes/Page";

export class GetStockTitlesQuery extends GraphQLQuery<Page<StockTitle>, StockTitle[]> {
    query = gql`
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