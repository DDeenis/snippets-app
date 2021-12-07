import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Center, Container} from '@chakra-ui/layout';
import {Box, Text} from '@chakra-ui/react';
import {NextPage} from 'next';
import {BottomButton} from '../src/components/BackButton/BottomButton';
import {useUserProfile} from '../src/hooks/login';
import {CheckIcon, CloseIcon, EditIcon} from '@chakra-ui/icons';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {ProfleInfoEntry} from '../src/components/Form/Profile/ProfileInfoEntry';
import {ProfleFormEntry} from '../src/components/Form/Profile/ProfileFormEntry';
import {userResolver} from '../src/helpers/forms/user';

interface UserProfileForm {
  firstName: string;
  lastName: string;
  email: string;
}

const Profile: NextPage = () => {
  const [isForm, setIsForm] = useState(false);
  const userProfile = useUserProfile();
  const {user} = useUser();
  const {register, handleSubmit} = useForm<UserProfileForm>({
    resolver: userResolver,
    defaultValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: user?.email ?? '',
    },
  });

  const handleEditStart = () => setIsForm(true);
  const handleEditEnd = () => setIsForm(false);
  const handleEditProfile = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <Center>
      <Container
        maxW="container.lg"
        minH="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        py="6"
        px="12"
        borderRadius="6"
        display="flex"
        flexDirection="column"
        gridGap="8"
        as={isForm ? 'form' : 'div'}
        onSubmit={handleEditProfile}
      >
        <Text fontWeight="bold" fontSize="2xl">
          Edit your profile
        </Text>
        <Box display="flex" flexDir="column" gridGap="5">
          <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gridGap="4">
            {isForm ? (
              <ProfleFormEntry label="First name" {...register('firstName')} />
            ) : (
              <ProfleInfoEntry label="First name" value={userProfile.firstName} />
            )}
            {isForm ? (
              <ProfleFormEntry label="Last name" {...register('lastName')} />
            ) : (
              <ProfleInfoEntry label="Last name" value={userProfile.lastName} />
            )}
          </Box>
          {isForm ? (
            <ProfleFormEntry label="Email" {...register('email')} />
          ) : (
            <ProfleInfoEntry label="Email" value={user?.email ?? ''} />
          )}
          <ProfleInfoEntry label="ID" value={userProfile.userId} />
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gridGap="3">
          <BottomButton
            text={isForm ? 'Submit' : 'Edit'}
            type={isForm ? 'submit' : 'button'}
            icon={isForm ? <CheckIcon /> : <EditIcon />}
            onClick={isForm ? undefined : handleEditStart}
          />
          {isForm && <BottomButton icon={<CloseIcon />} text={'Cancel'} onClick={handleEditEnd} type="button" />}
        </Box>
      </Container>
    </Center>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();
