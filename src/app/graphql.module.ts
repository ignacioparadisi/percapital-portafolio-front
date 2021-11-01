import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

//const uri = 'https://percapital-backend.herokuapp.com';
const uri = 'http://localhost:4000';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext(() => ({
    headers: {
      // TODO: Agarrar el usuario autenticado
      Authorization: '1'
    }
  }));
  return {
    link: ApolloLink.from([auth, httpLink.create({uri})]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
