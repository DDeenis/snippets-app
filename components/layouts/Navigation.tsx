import {Center, Flex, Text} from '@chakra-ui/layout';
import {NextPage} from 'next';
import Link from 'next/link';

export const Navigation: NextPage = () => {
  return (
    <Center as="header">
      <Flex as="nav" direction="column" gridGap="6" justify="center" alignItems="center" my={3}>
        <Text color="yellow.100" fontSize="4xl" fontWeight="semibold">
          Snippets App
        </Text>
        <Flex justify="center" alignItems="center" gridGap="6">
          <Text color="yellow.100" fontWeight="normal" fontSize="md">
            <Link href={'/snippets'}>All Snippets</Link>
          </Text>
          <Text color="yellow.100" fontWeight="normal" fontSize="md">
            <Link href={'/mySnippets'}>My Snippets</Link>
          </Text>
          <Text color="yellow.100" fontWeight="normal" fontSize="md">
            <Link href={'/addSnippet'}>Add Snippet</Link>
          </Text>
          <Text color="yellow.100" fontWeight="normal" fontSize="md">
            <Link href={'/login'}>Login</Link>
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
};
