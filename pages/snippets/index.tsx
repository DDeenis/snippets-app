import {NextPage} from 'next';
import {useQuery} from '@apollo/client';
import {Container} from '@chakra-ui/layout';
import {useEffect} from 'react';
import {GetSnippets, GetSnippetsResponse, Snippet} from '../../src/query/snippets';
import SnippetComponent from '../../src/components/Snippet/Snippet';
import Prism from 'prismjs';

const SnippetsPage: NextPage<{snippets: Snippet[]}> = () => {
  const {data} = useQuery<GetSnippetsResponse>(GetSnippets);
  const snippets = data?.querySnippet;

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
