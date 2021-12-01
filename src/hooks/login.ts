import {useMutation, useQuery} from '@apollo/client';
import Cookie from 'js-cookie';
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
} from '../query/user/user';

export const useCurrentUser = () => {
  const token = Cookie.get('token') ?? '';

  const {data} = useQuery<GetUserResponse, GetUserRequest>(GetUser, {
    variables: {
      id: token,
    },
  });

  return data?.getUser;
};

export const useCreateUser = () => {
  const {refetch} = useQuery<GetUsersResponse, {filter: {userId: {alloftext: string}}}>(GetUsers, {skip: true});
  const [create] = useMutation<CreateUserResponse, CreateUserRequest>(CreateUser);

  return async (user: Omit<User, 'id'>) => {
    const {data} = await refetch({
      filter: {
        userId: {
          alloftext: user.userId,
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

    const responseUser = response.data?.addUser.user;

    if (responseUser) {
      Cookie.set('token', user.userId);
    }

    return responseUser;
  };
};
