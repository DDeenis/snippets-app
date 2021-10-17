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
