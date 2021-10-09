import { Page } from "src/common/classes/Page";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { GetStockTitlesQuery } from "./GetStockTitlesQuery";

export class QueryFactory {
    static getGetStockTitlesQuery(page?: Page<StockTitle>): GraphQLQuery<Page<StockTitle>, StockTitle[]> {
        return new GetStockTitlesQuery(page);
    }
}