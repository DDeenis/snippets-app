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

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  getUser: User;
}

export const GetUser = gql`
  query getAllUsers($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }

  ${UserFragment}
`;

export interface CreateUserRequest {
  input: [User];
}

export interface CreateUserResponse {
  addUser: {
    user: User;
  };
}

export const CreateUser = gql`
  mutation MyMutation($input: [AddUserInput!]) {
    addUser(input: $input) {
      user {
        ...UserFragment
      }
    }
  }

  ${UserFragment}
`;
