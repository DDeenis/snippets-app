import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {GetServerSideProps, NextPage} from 'next';
import {useEffect} from 'react';
import Prism from 'prismjs';
import {usePagedSnippets} from '../../src/hooks/snippet';
import {SnippetsList} from '../../src/components/SnippetsList/SnippetsList';
import {useUserProfile} from '../../src/hooks/login';

const PersonalSnippets: NextPage = () => {
  const user = useUserProfile();
  const {snippets, handleFetchMore, hasMore} = usePagedSnippets((snippets) =>
    snippets?.filter((s) => s.User.id === user.id),
  );

  useEffect(() => {
    if (window) {
      Prism.highlightAll();
    }
  }, [snippets?.length]);

  return <SnippetsList snippets={snippets} fetchMore={handleFetchMore} hasMore={hasMore} />;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default PersonalSnippets;
