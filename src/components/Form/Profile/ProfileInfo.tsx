import {EditIcon} from '@chakra-ui/icons';
import {Box, Center, Container, Text} from '@chakra-ui/react';
import React from 'react';
import {UserInfo} from '../../../hooks/login';
import {BottomButton} from '../../BackButton/BottomButton';
import {ProfleInfoEntry} from './ProfileInfoEntry';

interface ProfileInfoProps {
  handleEdit: () => void;
  user?: UserInfo;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({user, handleEdit}) => {
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
            <ProfleInfoEntry label="First name" value={user?.firstName} />
            <ProfleInfoEntry label="Last name" value={user?.lastName} />
          </Box>
          <ProfleInfoEntry label="Email" value={user?.email ?? ''} />
          <ProfleInfoEntry label="ID" value={user?.userId} />
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gridGap="3">
          <BottomButton text={'Edit'} type={'button'} icon={<EditIcon />} onClick={handleEdit} />
        </Box>
      </Container>
    </Center>
  );
};
