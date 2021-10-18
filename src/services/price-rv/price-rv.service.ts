import { Injectable } from '@angular/core';
import { Page } from 'src/common/classes/Page';
import { PriceRV } from 'src/common/classes/PriceRV';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';

@Injectable({
  providedIn: 'root'
})
export class PriceRvService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getPriceRVs(page?: Page<PriceRV>) {
    let query = this.queryFactory.getGetPriceRvsQuery(page);
    return query.execute();
  }

  createPriceRv(priceRV: PriceRV) {
    let mutation = this.mutationFactory.getCreatePriceRVMutation(priceRV);
    return mutation.execute();
  }
}
