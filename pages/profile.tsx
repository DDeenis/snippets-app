import {Center, Container} from '@chakra-ui/layout';
import {NextPage} from 'next';

const Profile: NextPage = () => {
  return (
    <Center>
      <Container
        maxW="container.lg"
        minH="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        p="6"
        borderRadius="6"
        display="flex"
        flexDirection="column"
        gridGap="4"
      ></Container>
    </Center>
  );
};

export default Profile;
