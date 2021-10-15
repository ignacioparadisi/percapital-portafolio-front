import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";
import { map } from 'rxjs/operators';
import { GraphQL } from "./GraphQL";

export abstract class GraphQLMutation<Params, Result> extends GraphQL<Params, Result> {
    readonly name: string
    readonly value: DocumentNode
    constructor(readonly params?: Params) {
        super();
     }

    execute(apollo: Apollo){
        return apollo.mutate<Result>({
            mutation: this.value,
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