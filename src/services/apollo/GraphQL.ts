export abstract class GraphQL<Params, Result> {
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
        return variables;
    }
}