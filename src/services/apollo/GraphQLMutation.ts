import { MutationFetchPolicy } from "@apollo/client/core/watchQueryOptions";
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
        console.info({
            mutation: this.mutation,
            variables
        });
        return this.apollo.mutate<Result>({
            mutation,
            variables
        }).pipe(
            map(({ data }) => {
                let name = this.getName(this.mutation);
                // @ts-ignore
                if (!data || !data[name]) {
                    throw new Error('Invalid data. ' + JSON.stringify(data));
                }
                // @ts-ignore
                return data[name] as Result
            })
        );
    }
}