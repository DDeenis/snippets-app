import {useMutation, useQuery} from '@apollo/client';
import Cookie from 'js-cookie';
import {GQLAddUserInput, GQLUserFilter} from '../graphql.schema';
import {
  CreateUser,
  CreateUserRequest,
  CreateUserResponse,
  GetUser,
  GetUserRequest,
  GetUserResponse,
  GetUsers,
  GetUsersResponse,
  User,
} from '../query/user';

const normalizeUser = (user?: User): User => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    id: user?.id ?? '',
    userId: user?.userId ?? '',
  };
};

export const useUserProfile = () => {
  const token = Cookie.get('token') ?? '';

  const {data} = useQuery<GetUserResponse, GetUserRequest>(GetUser, {
    variables: {
      id: token,
    },
  });

  return normalizeUser(data?.getUser);
};

export const useCreateUser = () => {
  const {refetch} = useQuery<GetUsersResponse, {filter: GQLUserFilter}>(GetUsers, {skip: true});
  const [create] = useMutation<CreateUserResponse, CreateUserRequest>(CreateUser);

  return async (user: GQLAddUserInput) => {
    try {
      const {data} = await refetch({
        filter: {
          userId: {
            eq: user.userId,
          },
        },
      });

      if (data.queryUser[0]) {
        return undefined;
      }

      const response = await create({
        variables: {
          input: [user],
        },
      });

      const responseUser = response.data?.addUser.user[0];

      if (responseUser) {
        Cookie.set('token', responseUser.id);
      }

      return responseUser;
    } catch (error) {
      console.log(error);
    }
  };
};
