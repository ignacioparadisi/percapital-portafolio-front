import { Injectable } from '@angular/core';
import { TypeValue } from 'src/common/classes/ConstantType';
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

  getConstantTypes() {
    let query = this.queryFactory.getGetConstantTypesQuery();
    return query.execute();
  }

  createOperation(operation: Operation) {
    let query = this.mutationFactory.getCreateOperationMutation(operation);
    return query.execute();
  }

  createConstantValue(constantValue: TypeValue) {
    let mutation = this.mutationFactory.getCreateConstantValue(constantValue);
    return mutation.execute();
  }
}
