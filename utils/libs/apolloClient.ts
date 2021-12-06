import {useMemo} from 'react';
import {ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {GRAPHQL_URL} from '../../src/constants/env';
import {offsetLimitPagination} from '@apollo/client/utilities';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  headers: {},
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}. Backend is unreachable.`);
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Snippets: {
          merge: true,
        },
        Query: {
          fields: {
            Snippets: offsetLimitPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({...existingCache, ...initialState});
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
