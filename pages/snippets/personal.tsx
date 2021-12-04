import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {GetServerSideProps, NextPage} from 'next';
import {useEffect} from 'react';
import Prism from 'prismjs';
import {Container} from '@chakra-ui/layout';
import SnippetComponent from '../../src/components/Snippet/Snippet';
import {usePersonalSnippets} from '../../src/hooks/snippet';

const PersonalSnippets: NextPage = () => {
  const {snippets} = usePersonalSnippets();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [snippets?.length]);

  return (
    <Container px={{md: 4, sm: 0}} py={3} maxW="100%" display="flex" flexDir="column" gridGap="6">
      {snippets?.map((snippet) => (
        <SnippetComponent key={snippet.id} snippet={snippet} />
      ))}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default PersonalSnippets;
