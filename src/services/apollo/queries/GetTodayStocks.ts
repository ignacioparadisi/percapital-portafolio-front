import {GraphQLQuery} from "../GraphQLQuery";
import {StockHistoric} from "../../../common/classes/StockHistoric";

export class GetTodayStocks extends GraphQLQuery<StockHistoric, StockHistoric[]> {
  query = `
  query getTodayStocks {
    getTodayStocks {
      id
      symbol
      date
      openPrice
      closePrice
      highPrice
      lowPrice
      volume
      change
    }
  }
  `
}
