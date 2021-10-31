import {NextPage} from 'next';
import {GetSnippets, GetSnippetsResponse, Snippet} from '../../query/snippets/snippets';
import {useQuery} from '@apollo/client';
import {Container} from '@chakra-ui/layout';
import SnippetComponent from '../../components/Snippet';
import Prism from 'prismjs';
import {useEffect} from 'react';

const SnippetsPage: NextPage<{snippets: Snippet[]}> = () => {
  const {data} = useQuery<GetSnippetsResponse>(GetSnippets);
  const snippets = data?.querySnippet;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [snippets?.length]);

  return (
    <Container px={{md: 4, sm: 0}} py={3} maxW="100%">
      {snippets?.map((snippet) => (
        <SnippetComponent key={snippet.id} snippet={snippet} />
      ))}
    </Container>
  );
};

export default SnippetsPage;
