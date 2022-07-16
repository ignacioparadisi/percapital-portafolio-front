import { Injectable } from '@angular/core';
import { User } from 'src/common/classes/User';
import { MutationFactory } from '../apollo/mutations/MutationFactory';
import { QueryFactory } from '../apollo/queries/QueryFactory';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private queryFactory: QueryFactory, private mutationFactory: MutationFactory) { }

  register(user: User) {
    let query = this.mutationFactory.getCreateUserMutation(user);
    return query.execute();
  }
  
}
