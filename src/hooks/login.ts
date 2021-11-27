import {useMutation, useQuery} from '@apollo/client';
import Cookie from 'js-cookie';
import {
  CreateUser,
  CreateUserRequest,
  CreateUserResponse,
  GetUser,
  GetUserRequest,
  GetUserResponse,
  User,
} from '../query/user/user';

export const useUser = () => {
  const token = Cookie.get('token') ?? '';

  const {data} = useQuery<GetUserResponse, GetUserRequest>(GetUser, {
    variables: {
      id: token,
    },
  });

  return data?.getUser;
};

export const useCreateUser = () => {
  const [create] = useMutation<CreateUserResponse, CreateUserRequest>(CreateUser);

  return async (user: User) => {
    const response = await create({
      variables: {
        input: [user],
      },
    });

    const responseUser = response.data?.addUser.user;

    if (responseUser) {
      Cookie.set('token', user.id);
    }

    return responseUser;
  };
};
