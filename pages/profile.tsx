import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {NextPage} from 'next';
import {useUpdateUser, useUserInfo} from '../src/hooks/user';
import {useState} from 'react';
import {ProfileForm} from '../src/components/Form/Profile/ProfileForm';
import {ProfileInfo} from '../src/components/Form/Profile/ProfileInfo';
import {UserProfileForm} from '../src/helpers/forms/user';

const Profile: NextPage = () => {
  const [isForm, setIsForm] = useState(false);
  const user = useUserInfo();
  const updateUser = useUpdateUser(user.id);

  const handleEditStart = () => setIsForm(true);
  const handleEditEnd = () => setIsForm(false);
  const handleSubmit = (formData: UserProfileForm) => {
    updateUser({
      userId: user.userId,
      ...formData,
    });
  };

  return isForm ? (
    <ProfileForm user={user} onSubmit={handleSubmit} handleEditEnd={handleEditEnd} />
  ) : (
    <ProfileInfo user={user} handleEdit={handleEditStart} />
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();
