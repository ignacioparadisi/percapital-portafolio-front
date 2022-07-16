import {GraphQLQuery} from "../GraphQLQuery";
import { User } from "src/common/classes/User";

export class LoginQuery extends GraphQLQuery<User, User> {
  query = `
  query login($email: String!, $password: String!) {
    login(where: {
        email: $email,
        password: $password
    }) {
        id
        name
        email
        roles {
            id
            name
        }
    }
  }
  `
}