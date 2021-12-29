import {useMutation, useQuery} from '@apollo/client';
import {UserProfile, useUser} from '@auth0/nextjs-auth0';
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
  UpdateUser,
  UpdateUserRequest,
  UpdateUserResponse,
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

export type UserInfo = User & UserProfile;

export const useUserInfo = (): UserInfo => {
  const user = useUserProfile();
  const {user: userProfile} = useUser();

  const userInfo: UserInfo = {...userProfile, ...user, email: user.email || userProfile?.email || ''};

  return userInfo;
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

export const useUpdateUser = (userId: string) => {
  const [update] = useMutation<UpdateUserResponse, UpdateUserRequest>(UpdateUser);

  return async (user: Omit<User, 'id'>) => {
    const result = await update({
      variables: {
        id: [userId],
        set: user,
      },
    });

    return result.data?.user;
  };
};
