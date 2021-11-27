import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box} from '@chakra-ui/layout';
import {GetServerSideProps, NextPage} from 'next';

const CreateSnippet: NextPage = () => {
  return <Box></Box>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default CreateSnippet;
