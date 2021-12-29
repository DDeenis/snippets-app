import {CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {Box, Center, Container, Text} from '@chakra-ui/react';
import React from 'react';
import {useForm} from 'react-hook-form';
import {UserProfileForm, userResolver} from '../../../helpers/forms/user';
import {UserInfo} from '../../../hooks/user';
import {BottomButton} from '../../BackButton/BottomButton';
import {ProfleFormEntry} from './ProfileFormEntry';
import {ProfleInfoEntry} from './ProfileInfoEntry';

interface ProfileFormProps {
  onSubmit: (formData: UserProfileForm) => void;
  handleEditEnd: () => void;
  user?: UserInfo;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({user, onSubmit, handleEditEnd}) => {
  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email ?? '',
  };
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<UserProfileForm>({
    defaultValues,
    resolver: userResolver,
  });

  const handleEditProfile = handleSubmit((formData) => {
    onSubmit(formData);
    handleEditEnd();
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
        as={'form'}
        onSubmit={handleEditProfile}
      >
        <Text fontWeight="bold" fontSize="2xl">
          Edit your profile
        </Text>
        <Box display="flex" flexDir="column" gridGap="5">
          <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gridGap="4">
            <ProfleFormEntry
              label="First name"
              placeholder="First name"
              isInvalid={Boolean(errors['firstName'])}
              error={errors['firstName']?.message}
              control={control}
              name="firstName"
            />
            <ProfleFormEntry
              label="Last name"
              placeholder="Last name"
              isInvalid={Boolean(errors['lastName'])}
              error={errors['lastName']?.message}
              control={control}
              name="lastName"
            />
          </Box>
          <ProfleFormEntry
            label="Email"
            placeholder="Email"
            isInvalid={Boolean(errors['email'])}
            error={errors['email']?.message}
            control={control}
            name="email"
          />
          <ProfleInfoEntry label="ID" value={user?.userId} />
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gridGap="3">
          <BottomButton text={'Submit'} type={'submit'} icon={<CheckIcon />} />
          <BottomButton icon={<CloseIcon />} text={'Cancel'} onClick={handleEditEnd} type="button" />
        </Box>
      </Container>
    </Center>
  );
};
