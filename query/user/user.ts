import {gql} from '@apollo/client';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface GetUsersResponse {
  queryUser: User[];
}

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
  }
`;

export const GetUsers = gql`
  query getAllUsers {
    queryUser {
      ...UserFragment
    }
  }

  ${UserFragment}
`;
