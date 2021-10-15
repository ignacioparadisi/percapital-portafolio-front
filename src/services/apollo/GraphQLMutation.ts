import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";
import { map } from 'rxjs/operators';
import { GraphQL } from "./GraphQL";

export abstract class GraphQLMutation<Params, Result> extends GraphQL<Params, Result> {
    readonly name: string
    readonly mutation: DocumentNode
    constructor(readonly params?: Params) {
        super();
        console.log(this.constructor.name);
     }

    execute(apollo: Apollo){
        return apollo.mutate<Result>({
            mutation: this.mutation,
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