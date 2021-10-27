import {Container} from '@chakra-ui/layout';
import {NextPage} from 'next';
import {Navigation} from './Navigation';

export const Layout: NextPage = ({children}) => {
  return (
    <Container px={4} py={3} bg="brown" maxW="100%" minH="100vh">
      <Navigation />
      {children}
    </Container>
  );
};
