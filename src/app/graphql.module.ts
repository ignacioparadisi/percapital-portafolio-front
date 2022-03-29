import {NgModule} from '@angular/core';
import {Apollo, ApolloModule} from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const isBackendRunningLocally = false;
const serverURL = isBackendRunningLocally ? 'http://localhost:4000' : 'https://percapital-backend.herokuapp.com';
const predictionURL = isBackendRunningLocally ? 'http://localhost:4001' : 'https://percapital-backend-prediction.herokuapp.com';

function createApollo(httpLink: HttpLink, uri: string): ApolloClientOptions<any> {
  const auth = setContext(() => ({
    headers: {
      // TODO: Agarrar el usuario autenticado
      Authorization: '1'
    }
  }));
  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([auth, httpLink.create({uri})])
  };
}

@NgModule({
  imports: [ApolloModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create(createApollo(httpLink, serverURL));
    apollo.create(createApollo(httpLink, predictionURL), 'prediction');
  }
}

