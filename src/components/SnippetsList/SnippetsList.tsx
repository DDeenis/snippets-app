import {Container, Text} from '@chakra-ui/layout';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Snippet} from '../../query/snippets';
import SnippetComponent from '../Snippet/Snippet';

interface SnippetsListProps {
  snippets?: Snippet[];
  fetchMore: () => void;
  hasMore: boolean;
}

export const SnippetsList: React.FC<SnippetsListProps> = ({snippets, fetchMore, hasMore}) => {
  return (
    <Container px={{md: 4, sm: 0}} py={3} maxW="100%">
      <InfiniteScroll
        loadMore={fetchMore}
        pageStart={0}
        useWindow={true}
        hasMore={hasMore}
        loader={
          <Text mx="auto" color="white">
            Loading...
          </Text>
        }
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {snippets?.map((snippet) => (
          <SnippetComponent key={snippet.id} snippet={snippet} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};
