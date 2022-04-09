import {GraphQLQuery} from "../GraphQLQuery";
import {StockHistoric} from "src/common/classes/StockHistoric";

export class GetStockHistoricBySymbol extends GraphQLQuery<StockHistoric, [StockHistoric]> {
  query = `
  query getStockHistoricBySymbol($symbol: String!, $interval: String) {
    getStockHistoricBySymbol(symbol: $symbol, interval: $interval) {
        id
        symbol
        symbolDescription
        date
        closePrice
        openPrice
        highPrice
        lowPrice
        volume
        change
    }
}
  `
}
