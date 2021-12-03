import {gql} from '@apollo/client';

export interface Language {
  id: string;
  name: string;
}

export const LanguageFragment = gql`
  fragment LanguageFragment on Language {
    id
    name
  }
`;

export interface GetLanguagesResponse {
  queryLanguage: Language[];
}

export const GetLanguages = gql`
  query getLanguages($filter: LanguageFilter) {
    queryLanguage(filter: $filter) {
      ...LanguageFragment
    }
  }

  ${LanguageFragment}
`;
