import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";
import { GraphQL } from "./GraphQL";
import { map } from 'rxjs/operators';

export abstract class GraphQLQuery<Params, Result> extends GraphQL<Params, Result>{
    readonly name: string;
    readonly value: DocumentNode;
    constructor(readonly params?: Params) { 
        super();
    }

    execute(apollo: Apollo) {
        return apollo.query<Result>({
            query: this.value,
            variables: this.getVariables(this.params)
        }).pipe(
            map(({ data }) => {
              // @ts-ignore
              if (!data || !data[this.name]) {
                  throw new Error('Invalid data');
              }
              // @ts-ignore
              return data[this.name] as R
          })
        );
    }
}