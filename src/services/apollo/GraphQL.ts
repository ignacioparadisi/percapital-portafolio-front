import { Apollo } from "apollo-angular";

export abstract class GraphQL<Params, Result> {
    constructor(readonly apollo: Apollo) {}

    getVariables<T, R>(params?: Params) {
        let variables = {};
        if (!params) {
            return variables;
        }
        Object.keys(params).forEach(key => {
            // @ts-ignore
            if (params[key]) {
                // @ts-ignore
                variables[key] = params[key];
            }
        });
        console.log(variables);
        return variables;
    }

    /**
     * Converts the name of the class to the name of the query or mutation.
     * @returns The name of the query or mutation
     */
    protected getName(query: string) {
        let splitQuery = query.split('{');
        splitQuery = splitQuery[1].split('(');
        return splitQuery[0].trim();
    }
}