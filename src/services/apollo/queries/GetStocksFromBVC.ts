import {GraphQLQuery} from "../GraphQLQuery";
import {StockHistoric} from "../../../common/classes/StockHistoric";

export class GetStocksFromBVC extends GraphQLQuery<StockHistoric, [StockHistoric]> {
  query = `
  query getStockFromBVC {
    getStockFromBVC {
        symbol
        date
        closePrice
    }
  }
  `
}
