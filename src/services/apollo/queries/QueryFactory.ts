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
import { GetLatestExchangeRateQuery } from "./GetLatestExchangeRateQuery";
import { GetConstantTypesQuery } from "./GetConstantTypesQuery";
import { GetPortfolioQuery } from "./GetPortfolioQuery";
import { QueryStockTitlesWithAmountQuery } from "./GetStockTitlesWithAmountQuery";
import {GetStockHistoricBySymbol} from "./GetStockHistoricBySymbol";
import {StockHistoric} from "../../../common/classes/StockHistoric";
import {GetStocksFromBVC} from "./GetStocksFromBVC";
import {GetTodayStocks} from "./GetTodayStocks";

@Injectable({
    providedIn: 'root'
})
export class QueryFactory {
    constructor(private apollo: Apollo) { }
    getGetStockTitlesQuery(page?: Page<StockTitle>) {
        return new GetStockTitlesQuery(this.apollo, page);
    }
    getGetStockTitlesWithAmountQuery() {
        return new QueryStockTitlesWithAmountQuery(this.apollo);
    }
    getGetExchangeRatesQuery(page?: Page<ExchangeRate>) {
        return new GetExchangeRatesQuery(this.apollo, page);
    }
    getGetLatestExchangeQuery() {
        return new GetLatestExchangeRateQuery(this.apollo);
    }
    getGetPriceRvsQuery(page?: Page<PriceRV>) {
        return new GetPriceRVsQuery(this.apollo, page);
    }
    getGetBuyOperationsQuery(page?: Page<Operation>) {
        return new GetOperationsQuery(this.apollo, page);
    }
    getGetConstantTypesQuery() {
        return new GetConstantTypesQuery(this.apollo);
    }
    getGetPortfolioQuery() {
        return new GetPortfolioQuery(this.apollo);
    }
    getGetStockHistoricBySymbolQuery(symbol: string, interval?: string) {
      let stock = new StockHistoric(symbol, interval);
      return new GetStockHistoricBySymbol(this.apollo, stock);
    }
    getGetStocksFromBVCQuery() {
      return new GetStocksFromBVC(this.apollo);
    }
    getTodayStocksQuery() {
      return new GetTodayStocks(this.apollo);
    }
}
