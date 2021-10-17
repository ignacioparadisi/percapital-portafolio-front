import { Injectable } from '@angular/core';
import { Operation } from 'src/common/classes/Operation';
import { Page } from 'src/common/classes/Page';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) {}

  getBuyOperations(page?: Page<Operation>) {
    let query = this.queryFactory.getGetBuyOperationsQuery(page);
    return query.execute();
  }
}
