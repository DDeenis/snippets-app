import {Container} from '@chakra-ui/layout';
import {NextPage} from 'next';
import {Navigation} from './Navigation';
import Head from 'next/head';

export const Layout: NextPage = ({children}) => {
  return (
    <Container px={4} py={3} bg="brown" maxW="100%" minH="100vh">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navigation />
      {children}
    </Container>
  );
};
