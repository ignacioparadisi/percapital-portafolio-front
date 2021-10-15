import { Injectable } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { Apollo } from 'apollo-angular';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';
import { Page } from 'src/common/classes/Page';

@Injectable({
  providedIn: 'root'
})
export class StockTitleService {

  constructor(private apollo: Apollo) { }

  getTitles(page?: Page<StockTitle>) {
    let query = QueryFactory.getGetStockTitlesQuery(page);
    return query.execute(this.apollo);
  }

  createTitle(stockTitle: StockTitle) {
    let mutation = MutationFactory.getCreateStockTitleMutation(stockTitle);
    return mutation.execute(this.apollo);
  }
}
