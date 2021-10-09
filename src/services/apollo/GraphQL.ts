import { Apollo } from "apollo-angular";
import { GraphQLMutation } from "src/services/apollo/GraphQLMutation";
import { GraphQLQuery } from "src/services/apollo/GraphQLQuery";
import { map } from 'rxjs/operators';

export function executeQuery<T>(query: GraphQLQuery<T>, apollo: Apollo) {
    return apollo.query<T>({
        query: query.query,
        variables: getVariables(query)
    }).pipe(
        map(({ data }) => {
          // @ts-ignore
          if (!data || !data[mutation.name]) {
              throw new Error('Invalid data');
          }
          // @ts-ignore
          return data[mutation.name] as T
      })
    );
}

export function executeMutation<T>(mutation: GraphQLMutation<T>, apollo: Apollo) {
    return apollo.mutate<T>({
        mutation: mutation.mutation,
        variables: getVariables(mutation)
    }).pipe(
        map(({ data }) => {
          // @ts-ignore
          if (!data || !data[mutation.name]) {
              throw new Error('Invalid data');
          }
          // @ts-ignore
          return data[mutation.name] as T
      })
    );
}

function getVariables<T>(query: GraphQLQuery<T> | GraphQLMutation<T>) {
    let variables = {};
    Object.keys(query.params).forEach(key => {
        // @ts-ignore
        if (query.params[key]) {
            // @ts-ignore
            variables[key] = query.params[key];
        }
    });
    return variables;
}