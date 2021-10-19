import { Apollo, gql } from "apollo-angular";
import { map } from 'rxjs/operators';
import { GraphQL } from "./GraphQL";

export abstract class GraphQLMutation<Params, Result> extends GraphQL<Params, Result> {
    abstract readonly mutation: string;
    constructor(readonly apollo: Apollo, readonly params?: Params) {
        super(apollo);
     }

    execute() {
        let mutation = gql`${this.mutation}`;
        let variables = this.getVariables(this.params);
        return this.apollo.mutate<Result>({
            mutation,
            variables
        }).pipe(
            map(({ data }) => {
              // @ts-ignore
              if (!data || !data[this.name]) {
                  throw new Error('Invalid data');
              }
              // @ts-ignore
              return data[this.name] as Result
          })
        );
    }
}