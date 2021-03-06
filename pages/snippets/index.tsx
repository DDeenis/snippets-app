import {NextPage} from 'next';
import {useEffect} from 'react';
import {usePagedSnippets} from '../../src/hooks/snippet';
import {SnippetsList} from '../../src/components/SnippetsList/SnippetsList';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

const SnippetsPage: NextPage = () => {
  const {snippets, handleFetchMore, hasMore} = usePagedSnippets();

  useEffect(() => {
    if (window) {
      Prism.highlightAll();
    }
  }, [snippets?.length]);

  return <SnippetsList snippets={snippets} fetchMore={handleFetchMore} hasMore={hasMore} />;
};

export default SnippetsPage;
