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
    let mutation = this.mutationFactory.getCreateUserMutation(user);
    return mutation.execute();
  }

  login(email: string, password: string) {
    let query = this.queryFactory.getLoginQuery(email, password);
    return query.execute();
  }

}
