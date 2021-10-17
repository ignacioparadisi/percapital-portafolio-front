import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { Operation } from "src/common/classes/Operation";
import { Page } from "src/common/classes/Page";
import { PriceRV } from "src/common/classes/PriceRV";
import { StockTitle } from "src/common/classes/StockTitle";
import { GetOperationsQuery } from "./GetOperationsQuery";
import { GetExchangeRatesQuery } from "./GetExchangeRatesQuery";
import { GetPriceRVsQuery } from "./GetPriceRVsQuery";
import { GetStockTitlesQuery } from "./GetStockTitlesQuery";

@Injectable({
    providedIn: 'root'
})
export class QueryFactory {
    constructor(private apollo: Apollo) { }
    getGetStockTitlesQuery(page?: Page<StockTitle>) {
        return new GetStockTitlesQuery(this.apollo, page);
    }
    getGetExchangeRatesQuery(page?: Page<ExchangeRate>) {
        return new GetExchangeRatesQuery(this.apollo, page);
    }
    getGetPriceRvsQuery(page?: Page<PriceRV>) {
        return new GetPriceRVsQuery(this.apollo, page);
    }
    getGetBuyOperationsQuery(page?: Page<Operation>) {
        return new GetOperationsQuery(this.apollo, page);
    }
}