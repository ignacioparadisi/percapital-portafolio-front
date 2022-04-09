import { Injectable } from '@angular/core';
import { ExchangeRate } from 'src/common/classes/ExchangeRate';
import { Page } from 'src/common/classes/Page';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { GetExchangeRatesQuery } from '../apollo/queries/GetExchangeRatesQuery';
import { QueryFactory } from '../apollo/queries/QueryFactory';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getExchangeRates(page?: Page<ExchangeRate>) {
    let query = this.queryFactory.getGetExchangeRatesQuery(page);
    return query.execute();
  }

  getLatestExchangeRate() {
    let query = this.queryFactory.getGetLatestExchangeQuery();
    return query.execute();
  }
  createExchangeRate(exchangeRate: ExchangeRate) {
    let mutation = this.mutationFactory.getCreateExchangeRateMutation(exchangeRate);
    return mutation.execute();
  }

}
