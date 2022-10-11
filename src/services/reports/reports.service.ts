import { Injectable } from '@angular/core';
import { Report } from 'src/common/classes/Report';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  getReports() {
    let query = this.queryFactory.getReportsQuery();
    return query.execute();
  }

}
