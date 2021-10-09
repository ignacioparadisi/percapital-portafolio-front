import { Apollo } from "apollo-angular";
import { GraphQLMutation } from "src/services/apollo/GraphQLMutation";
import { GraphQLQuery } from "src/services/apollo/GraphQLQuery";
import { map } from 'rxjs/operators';

export function executeQuery<T, R>(query: GraphQLQuery<T, R>, apollo: Apollo) {
    return apollo.query<R>({
        query: query.value,
        variables: getVariables(query)
    }).pipe(
        map(({ data }) => {
          // @ts-ignore
          if (!data || !data[query.name]) {
              throw new Error('Invalid data');
          }
          // @ts-ignore
          return data[query.name] as R
      })
    );
}

export function executeMutation<T, R>(mutation: GraphQLMutation<T, R>, apollo: Apollo) {
    return apollo.mutate<R>({
        mutation: mutation.value,
        variables: getVariables(mutation)
    }).pipe(
        map(({ data }) => {
          // @ts-ignore
          if (!data || !data[mutation.name]) {
              throw new Error('Invalid data');
          }
          // @ts-ignore
          return data[mutation.name] as R
      })
    );
}

function getVariables<T, R>(query: GraphQLQuery<T, R> | GraphQLMutation<T, R>) {
    let variables = {};
    if (!query.params) {
        return variables;
    }
    Object.keys(query.params).forEach(key => {
        // @ts-ignore
        if (query.params[key]) {
            // @ts-ignore
            variables[key] = query.params[key];
        }
    });
    return variables;
}