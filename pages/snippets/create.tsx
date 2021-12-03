import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {FormControl} from '@chakra-ui/form-control';
import {CloseIcon, CheckIcon} from '@chakra-ui/icons';
import {Input} from '@chakra-ui/input';
import {Box, Center} from '@chakra-ui/layout';
import {Textarea} from '@chakra-ui/react';
import {Select} from '@chakra-ui/select';
import {GetServerSideProps, NextPage} from 'next';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {BottomButton} from '../../src/components/BackButton/BottomButton';
import {ErrorMessage} from '../../src/components/Form/ErrorMessage';
import {routes} from '../../src/constants/routes';
import {SnippetForm, snippetResolver} from '../../src/helpers/forms/snippet';
import {useLanguages} from '../../src/hooks/language';
import {useCreateUser, useCurrentUser} from '../../src/hooks/login';
import {useCreateSnippet} from '../../src/hooks/snippet';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';

const CodeEditor = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  {ssr: false},
);

const CreateSnippet: NextPage = () => {
  const {register, handleSubmit, formState, watch} = useForm<SnippetForm>({
    resolver: snippetResolver,
  });
  const languages = useLanguages();
  const currentUser = useCurrentUser();
  const {user} = useUser();
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
    });
  });

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
  console.log(watch('language'));

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
          <Select
            isInvalid={Boolean(errors.language?.message)}
            defaultValue="JavaScript"
            {...register('language')}
            {...inputStyles}
          >
            {languages?.map((l) => (
              <option key={l.id}>{l.name}</option>
            ))}
          </Select>
          <ErrorMessage message={errors.language?.message} />
          <CodeEditor
            {...register('code')}
            language={watch('language')}
            placeholder="Paste your code here"
            className="create-code-editor"
            padding={15}
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
