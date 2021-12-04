import {NextPage} from 'next';
import {Container} from '@chakra-ui/layout';
import {useEffect} from 'react';
import SnippetComponent from '../../src/components/Snippet/Snippet';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import {useSnippets} from '../../src/hooks/snippet';

const SnippetsPage: NextPage = () => {
  const {snippets} = useSnippets();

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

export default SnippetsPage;
