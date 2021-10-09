import { Injectable } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { Apollo } from 'apollo-angular';
import { executeMutation } from 'src/services/apollo/GraphQL';
import { MutationFactory } from '../apollo/mutations/MutationFactory';

@Injectable({
  providedIn: 'root'
})
export class StockTitleService {

  constructor(private apollo: Apollo) { }

  createTitle(stockTitle: StockTitle) {
    let mutation = MutationFactory.getCreateStockTitleMutation(stockTitle);
    return executeMutation(mutation, this.apollo);
  }
}
