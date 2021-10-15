import { Injectable } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';
import { Page } from 'src/common/classes/Page';

@Injectable({
  providedIn: 'root'
})
export class StockTitleService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getTitles(page?: Page<StockTitle>) {
    let query = this.queryFactory.getGetStockTitlesQuery(page);
    return query.execute();
  }

  createTitle(stockTitle: StockTitle) {
    let mutation = this.mutationFactory.getCreateStockTitleMutation(stockTitle);
    return mutation.execute();
  }
}
