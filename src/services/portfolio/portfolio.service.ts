import { Injectable } from '@angular/core';
import { QueryFactory } from '../apollo/queries/QueryFactory';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private queryFactory: QueryFactory) { }

  getPortfolio() {
    let query = this.queryFactory.getGetPortfolioQuery();
    return query.execute();
  }
}
