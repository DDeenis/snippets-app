import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {FormControl} from '@chakra-ui/form-control';
import {CloseIcon, CheckIcon} from '@chakra-ui/icons';
import {Input} from '@chakra-ui/input';
import {Box, Center} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {GetServerSideProps, NextPage} from 'next';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {BottomButton} from '../../src/components/BackButton/BottomButton';
import {ErrorMessage} from '../../src/components/Form/ErrorMessage';
import {routes} from '../../src/constants/routes';
import {SnippetForm, snippetResolver} from '../../src/helpers/forms/snippet';
import {useLanguages} from '../../src/hooks/language';
import {useCreateUser, useUserProfile} from '../../src/hooks/login';
import {useCreateSnippet} from '../../src/hooks/snippet';
import {useRouter} from 'next/dist/client/router';
import Editor from '@monaco-editor/react';

const CreateSnippet: NextPage = () => {
  const {register, handleSubmit, formState, watch, setValue} = useForm<SnippetForm>({
    resolver: snippetResolver,
    defaultValues: {
      language: 'JavaScript',
    },
  });
  const languages = useLanguages();
  const currentUser = useUserProfile();
  const {user} = useUser();
  const {push} = useRouter();
  const createUser = useCreateUser();
  const createSnippet = useCreateSnippet();

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name?.split(' ') ?? [user.name ?? '', ''];
      createUser({
        firstName,
        lastName,
        userId: user?.sub ?? '',
      });
    }
  }, []);

  const {errors} = formState;
  const onSubmit = handleSubmit((formData: SnippetForm) => {
    createSnippet({
      User: currentUser,
      Language: {
        id: languages?.find((l) => l.name == formData.language)?.id ?? '',
      },
      name: formData.name,
      code: formData.code,
    }).then(() => push(routes.nav.allSnippets));
  });

  const handleChangeCode = (val?: string) => setValue('code', val ?? '');

  const inputStyles = {
    borderColor: 'yellow.600',
    color: 'black',
    _placeholder: {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    _hover: {
      borderColor: 'yellow.500',
    },
  };

  return (
    <Center>
      <Box
        maxW="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        p="6"
        borderRadius="6"
        display="flex"
        flexDirection="column"
      >
        <FormControl
          as="form"
          onSubmit={onSubmit}
          display="flex"
          flexDirection="column"
          gridGap="3"
          minH="container.md"
        >
          <Input
            label="Name"
            placeholder="Name"
            isInvalid={Boolean(errors.name?.message)}
            {...register('name')}
            {...inputStyles}
          />
          <ErrorMessage message={errors.name?.message} />
          <Select isInvalid={Boolean(errors.language?.message)} {...register('language')} {...inputStyles}>
            {languages?.map((l) => (
              <option key={l.id}>{l.name}</option>
            ))}
          </Select>
          <ErrorMessage message={errors.language?.message} />
          <Editor
            height="600px"
            theme="vs-dark"
            defaultLanguage="javascript"
            language={watch('language').toLowerCase()}
            onChange={handleChangeCode}
          />
          <ErrorMessage message={errors.code?.message} />
          <Box mt="auto" display="flex" justifyContent="flex-end" gridGap="3">
            <BottomButton icon={<CheckIcon />} text={'Submit'} type="submit" />
            <BottomButton icon={<CloseIcon />} text={'Cancel'} link={routes.nav.allSnippets} type="button" />
          </Box>
        </FormControl>
      </Box>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default CreateSnippet;
