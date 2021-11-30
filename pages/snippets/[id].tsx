import {GetServerSideProps, NextPage} from 'next';
import {useEffect} from 'react';
import Prism from 'prismjs';
import {initializeApollo} from '../../utils/libs/apolloClient';
import {GetSnippet, GetSnippetRequest, GetSnippetResponse, Snippet} from '../../src/query/snippets/snippets';
import {Box, Center, Text} from '@chakra-ui/layout';
import {ArrowBackIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {BottomButton} from '../../src/components/BackButton/BottomButton';
import {routes} from '../../src/constants/routes';

const SnippetPage: NextPage<{snippet: Snippet}> = ({snippet}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  return (
    <Center>
      <Box
        maxW="container.lg"
        minH="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        p="6"
        borderRadius="6"
        display="flex"
        flexDirection="column"
        gridGap="4"
      >
        <Center>
          <Text isTruncated fontSize="3xl" fontWeight="semibold">
            {snippet.name}
          </Text>
        </Center>
        <Box display="flex" gridGap={1}>
          <Box py={1} px={2} w="max-content" bg="yellow.400" borderRadius="lg">
            <Text isTruncated>{snippet.Language.name}</Text>
          </Box>
          <Box py={1} px={2} maxW="max-content" bg="yellow.400" borderRadius="lg">
            <Link href={`/users/${snippet.User.id}`}>{`${snippet.User.firstName} ${snippet.User.lastName}`}</Link>
          </Box>
        </Box>
        <pre style={{margin: 0}} className={`language-${snippet.Language.name.toLowerCase()}`}>
          <code>{snippet.code}</code>
        </pre>
        <BottomButton icon={<ArrowBackIcon />} text={'Back'} link={routes.nav.allSnippets} />
      </Box>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const apolloClient = initializeApollo();
  const id = params?.id as string;

  const {data: snippet} = await apolloClient.query<GetSnippetResponse, GetSnippetRequest>({
    query: GetSnippet,
    variables: {
      id,
    },
  });

  return {
    props: {
      snippet: snippet.getSnippet,
    },
  };
};

export default SnippetPage;
