import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { Page } from "src/common/classes/Page";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLQuery } from "../GraphQLQuery";
import { GetExchangeRatesQuery } from "./GetExchangeRatesQuery";
import { GetStockTitlesQuery } from "./GetStockTitlesQuery";

@Injectable({
    providedIn: 'root'
})
export class QueryFactory {
    constructor(private apollo: Apollo) { }
    getGetStockTitlesQuery(page?: Page<StockTitle>): GraphQLQuery<Page<StockTitle>, Page<StockTitle>> {
        return new GetStockTitlesQuery(this.apollo, page);
    }
    getGetExchangeRatesQuery(page?: Page<ExchangeRate>): GraphQLQuery<Page<ExchangeRate>, Page<ExchangeRate>> {
        return new GetExchangeRatesQuery(this.apollo, page);
    }
}