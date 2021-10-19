import { Apollo, gql } from "apollo-angular";
import { GraphQL } from "./GraphQL";
import { map } from 'rxjs/operators';

export abstract class GraphQLQuery<Params, Result> extends GraphQL<Params, Result>{
    abstract readonly query: string;
    constructor(readonly apollo: Apollo, readonly params?: Params) { 
        super(apollo);
    }

    execute() {
        let query = gql`${this.query}`;
        let variables = this.getVariables(this.params);
        return this.apollo.query<Result>({
            query,
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