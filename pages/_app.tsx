import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {initializeApollo, useApollo} from '../utils/libs/apolloClient';
import {GetStaticProps} from 'next';
import {ChakraProvider} from '@chakra-ui/react';
import {Layout} from '../src/components/layouts/Layout';
import {GetUsers, GetUsersResponse} from '../src/query/user';
import {GetSnippets, GetSnippetsResponse} from '../src/query/snippets';
import {UserProvider} from '@auth0/nextjs-auth0';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({Component, pageProps}: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<GetUsersResponse>({
    query: GetUsers,
  });

  await apolloClient.query<GetSnippetsResponse>({
    query: GetSnippets,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default MyApp;
