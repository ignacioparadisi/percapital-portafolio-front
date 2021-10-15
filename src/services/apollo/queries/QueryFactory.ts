import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Page } from "src/common/classes/Page";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { GetStockTitlesQuery } from "./GetStockTitlesQuery";

@Injectable({
    providedIn: 'root'
})
export class QueryFactory {
    constructor(private apollo: Apollo) { }
    getGetStockTitlesQuery(page?: Page<StockTitle>): GraphQLQuery<Page<StockTitle>, StockTitle[]> {
        return new GetStockTitlesQuery(this.apollo, page);
    }
}