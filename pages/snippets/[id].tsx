import {GetServerSideProps, NextPage} from 'next';
import {useEffect} from 'react';
import Prism from 'prismjs';
import {initializeApollo} from '../../utils/libs/apolloClient';
import {GetSnippet, GetSnippetRequest, GetSnippetResponse, Snippet} from '../../query/snippets/snippets';
import SnippetComponent from '../../components/Snippet';

const SnippetPage: NextPage<{snippet: Snippet}> = ({snippet}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  return <SnippetComponent snippet={snippet} preview={false} />;
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
