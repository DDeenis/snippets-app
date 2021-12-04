import {useMutation, useQuery} from '@apollo/client';
import {GQLAddSnippetInput} from '../graphql.schema';
import {
  CreateSnippet,
  CreateSnippetRequest,
  CreateSnippetResponse,
  GetSnippets,
  GetSnippetsResponse,
} from '../query/snippets';
import {useUserProfile} from './login';

export const useSnippets = () => {
  const {data, ...other} = useQuery<GetSnippetsResponse>(GetSnippets, {
    fetchPolicy: 'cache-and-network',
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
