import {gql} from '@apollo/client';
import {GQLAddUserInput} from '../graphql.schema';

export interface User {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  __typename?: string;
}

export interface GetUsersResponse {
  queryUser: User[];
}

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    userId
    firstName
    lastName
  }
`;

export const GetUsers = gql`
  query getAllUsers($filter: UserFilter) {
    queryUser(filter: $filter) {
      ...UserFragment
    }
  }

  ${UserFragment}
`;

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  getUser: User;
}

export const GetUser = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }

  ${UserFragment}
`;

export interface CreateUserRequest {
  input: [GQLAddUserInput];
}

export interface CreateUserResponse {
  addUser: {
    user: User[];
  };
}

export const CreateUser = gql`
  mutation createUser($input: [AddUserInput!]!) {
    addUser(input: $input) {
      user {
        ...UserFragment
      }
    }
  }

  ${UserFragment}
`;
