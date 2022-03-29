import { Injectable } from '@angular/core';
import {QueryFactory} from "../apollo/queries/QueryFactory";
import {MutationFactory} from "../apollo/mutations/MutationFactory";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getStockHistoricBySymbol(symbol: string, interval?: string) {
    let query = this.queryFactory.getGetStockHistoricBySymbolQuery(symbol, interval);
    return query.execute('prediction');
  }

  getStocksFromBVC() {
    let query = this.queryFactory.getGetStocksFromBVCQuery();
    return query.execute('prediction');
  }

  getTodayStocks() {
    let query = this.queryFactory.getTodayStocksQuery();
    return query.execute('prediction');
  }
}
