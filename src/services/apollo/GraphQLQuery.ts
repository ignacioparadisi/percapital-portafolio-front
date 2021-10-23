import { Apollo, gql } from "apollo-angular";
import { GraphQL } from "./GraphQL";
import { map } from 'rxjs/operators';

export abstract class GraphQLQuery<Params, Result> extends GraphQL<Params, Result>{
    abstract readonly query: string;
    readonly findInCache: boolean = true;
    constructor(readonly apollo: Apollo, readonly params?: Params) { 
        super(apollo);
    }

    execute() {
        let query = gql`${this.query}`;
        let variables = this.getVariables(this.params);
        console.info({
            query: this.query,
            variables
        });
        return this.apollo.query<Result>({
            query,
            variables,
            fetchPolicy: this.findInCache ?  'cache-first' : 'network-only'
        }).pipe(
            map(({ data }) => {
              // @ts-ignore
              if (!data || !data[this.name]) {
                  console.error(data);
                  throw new Error('Invalid data. ' + JSON.stringify(data));
              }
              // @ts-ignore
              return data[this.name] as Result
          })
        );
    }
}