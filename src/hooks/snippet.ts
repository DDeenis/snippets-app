import {useMutation} from '@apollo/client';
import {GQLAddSnippetInput} from '../graphql.schema';
import {CreateSnippet, CreateSnippetRequest, CreateSnippetResponse} from '../query/snippets';

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
