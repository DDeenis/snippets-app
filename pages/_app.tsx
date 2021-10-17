import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {initializeApollo, useApollo} from '../utils/libs/apolloClient';
import {GetUsers, GetUsersResponse} from '../query/user/user';
import {GetStaticProps} from 'next';
import {ChakraProvider} from '@chakra-ui/react';
import {GetSnippets, GetSnippetsResponse} from '../query/snippets/snippets';
import {Layout} from '../components/layouts/Layout';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({Component, pageProps}: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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
