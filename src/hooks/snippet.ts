import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {GQLAddSnippetInput} from '../graphql.schema';
import {nullableArray} from '../helpers/common';
import {
  CreateSnippet,
  CreateSnippetRequest,
  CreateSnippetResponse,
  GetSnippets,
  GetSnippetsResponse,
  Snippet,
} from '../query/snippets';
import {useUserProfile} from './login';

const defaultFirst = 10;
const defaultOffset = 0;

interface UseSnippetsOptions {
  first?: number;
  offset?: number;
}

export const useSnippets = (options?: UseSnippetsOptions) => {
  const first = options?.first ?? defaultFirst;
  const offset = options?.offset ?? defaultOffset;

  const {data, ...other} = useQuery<GetSnippetsResponse>(GetSnippets, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first,
      offset,
    },
  });
  const snippets = data?.querySnippet;

  return {snippets, ...other};
};

export const usePersonalSnippets = () => {
  const user = useUserProfile();
  const {snippets, ...other} = useSnippets();

  return {
    snippets: snippets?.filter((s) => s.User.id === user.id),
    ...other,
  };
};

export const usePagedSnippets = (filterFunc?: (snippets?: Snippet[]) => Snippet[] | undefined) => {
  const {snippets: snippetsBase, fetchMore} = useSnippets();
  const [hasMore, setHasMore] = useState(true);
  const [snippets, setSnippets] = useState(snippetsBase);

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        offset: snippets?.length,
      },
    }).then((response) => {
      const chunk = response.data.querySnippet;

      if (!chunk.length) {
        setHasMore(false);
        return;
      }

      setSnippets([...nullableArray(snippets), ...chunk]);
    });
  };

  useEffect(() => {
    if (Number(snippetsBase?.length) > Number(snippets?.length)) {
      setSnippets(snippetsBase);
    }
  }, [snippetsBase?.length]);

  const snippetsResult = filterFunc ? filterFunc(snippets) : snippets;

  return {
    snippets: snippetsResult,
    handleFetchMore,
    hasMore,
  };
};

export const useCreateSnippet = () => {
  const [create] = useMutation<CreateSnippetResponse, CreateSnippetRequest>(CreateSnippet);

  return async (snippet: GQLAddSnippetInput) => {
    const response = await create({
      variables: {
        input: [snippet],
      },
    });

    const responseSnippet = response.data?.addSnippet.snippet;

    return responseSnippet;
  };
};
