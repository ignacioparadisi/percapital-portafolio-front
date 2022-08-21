import { Injectable } from '@angular/core';
import {QueryFactory} from "../apollo/queries/QueryFactory";
import {MutationFactory} from "../apollo/mutations/MutationFactory";
import { StockHistoric, StockHistoricInput } from 'src/common/classes/StockHistoric';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private get serverName() {
    return 'prediction'
  };

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getStockHistoricBySymbol(symbol: string, interval?: string) {
    let query = this.queryFactory.getGetStockHistoricBySymbolQuery(symbol, interval);
    return query.execute(this.serverName);
  }

  getStocksFromBVC() {
    let query = this.queryFactory.getGetStocksFromBVCQuery();
    return query.execute(this.serverName);
  }

  getTodayStocks() {
    let query = this.queryFactory.getTodayStocksQuery();
    return query.execute(this.serverName);
  }

  getPrediction(symbol: string, lookUpDays: number = 15) {
    let query = this.queryFactory.getGetPredictionQuery(symbol, lookUpDays);
    return query.execute(this.serverName);
  }

  createStockHistoric(stocks: StockHistoricInput[]) {
    let query = this.mutationFactory.getCreateStockHistoriMutation(stocks);
    return query.execute(this.serverName);
  }
}
