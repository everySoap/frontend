import React from 'react';

import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import withData from 'next-with-apollo';
import { onError } from 'apollo-link-error';
import cookie from 'js-cookie';
import { ApolloProvider } from 'react-apollo';

import { getMainDefinition } from 'apollo-utilities';
import { isString } from 'lodash';
import { server } from '../utils';

export function createClient({ headers, initialState, ...teet }: any) {
  const URL = `${(server && process.env.NODE_ENV === 'production') ? 'http://127.0.0.1:3001' : process.env.API_URL}/graphql`;
  const ssrMode = !(process as any).browser;

  const httpLink = new BatchHttpLink({
    uri: URL,
    credentials: 'include',
  });

  const contextLink = setContext(
    async () => ({
      headers: {
        accept: 'application/json',
        ...headers,
      },
    }),
  );

  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((err) => {
          if (isString(err.message)) {
            console.error(`[GraphQL error]{${err.path}}: Message: ${err.message}`);
          } else {
            console.error(`[GraphQL error]{${err.path}}: Message: ${(err.message as any)?.error?.toString()}`);
          }
        });
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
  );

  const wsLink = !ssrMode ? new WebSocketLink({
    uri: `${process.env.WS_URL}/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: cookie.get().Authorization,
        ...headers,
      },
    },
  }) : () => {
    console.log('SSR');
  };

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      );
    },
    wsLink as any,
    httpLink,
  );

  const link = ApolloLink.from([
    errorLink,
    contextLink,
    splitLink,
  ]);
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}
