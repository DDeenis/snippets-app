import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Center, Container} from '@chakra-ui/layout';
import {Box, Text} from '@chakra-ui/react';
import {NextPage} from 'next';
import {ProfleEntry} from '../src/components/Profile/ProfileEntry';
import {useUserProfile} from '../src/hooks/login';

const Profile: NextPage = () => {
  const user = useUserProfile();
  const {user: u} = useUser();

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
      >
        <Text fontWeight="bold" fontSize="2xl">
          Edit your profile
        </Text>
        <Box display="flex" flexDir="column" gridGap="5">
          <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gridGap="4">
            <ProfleEntry label="First name" value={user.firstName} />
            <ProfleEntry label="Last name" value={user.lastName} />
          </Box>
          <ProfleEntry label="Email" value={u?.email ?? ''} />
          <ProfleEntry label="ID" value={user.userId} />
        </Box>
      </Container>
    </Center>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();
