import {gql} from '@apollo/client';
import {GQLAddSnippetInput} from '../graphql.schema';
import {Language, LanguageFragment} from './language';
import {User, UserFragment} from './user';

export interface Snippet {
  id: string;
  name: string;
  code?: string;
  Language: Language;
  User: User;
}

export const SnippetFragment = gql`
  fragment SnippetFragment on Snippet {
    id
    name
    code
    Language {
      ...LanguageFragment
    }
    User {
      ...UserFragment
    }
  }

  ${UserFragment}
  ${LanguageFragment}
`;

export interface GetSnippetsResponse {
  querySnippet: Snippet[];
}

export const GetSnippets = gql`
  query getSnippets($filter: SnippetFilter, $first: Int, $offset: Int) {
    querySnippet(filter: $filter, first: $first, offset: $offset) {
      ...SnippetFragment
    }
  }

  ${SnippetFragment}
`;

export interface GetSnippetRequest {
  id: string;
}

export interface GetSnippetResponse {
  getSnippet: Snippet;
}

export const GetSnippet = gql`
  query getSnippets($id: ID!) {
    getSnippet(id: $id) {
      ...SnippetFragment
    }
  }

  ${SnippetFragment}
`;

export interface CreateSnippetRequest {
  input: [GQLAddSnippetInput];
}

export interface CreateSnippetResponse {
  addSnippet: {
    snippet: Snippet;
  };
}

export const CreateSnippet = gql`
  mutation createSnippet($input: [AddSnippetInput!]!) {
    addSnippet(input: $input) {
      snippet {
        ...SnippetFragment
      }
    }
  }

  ${SnippetFragment}
`;
