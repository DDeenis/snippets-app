import {useQuery} from '@apollo/client';
import {NextPage} from 'next';
import {GetUsers, GetUsersResponse} from '../src/query/user/user';

const UsersPage: NextPage = () => {
  const {data, loading} = useQuery<GetUsersResponse>(GetUsers);
  const users = data?.queryUser;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users?.map((u) => (
        <p key={u.id}>
          {u.firstName} {u.lastName}
        </p>
      ))}
    </div>
  );
};

export default UsersPage;
