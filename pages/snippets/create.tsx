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
import {routes} from '../../src/constants/routes';
import {SnippetForm, snippetResolver} from '../../src/helpers/forms/snippet';
import {useLanguages} from '../../src/hooks/language';
import {useCreateUser} from '../../src/hooks/login';

const CreateSnippet: NextPage = () => {
  const {register, handleSubmit} = useForm<SnippetForm>({
    resolver: snippetResolver,
  });
  const languages = useLanguages();
  const {user} = useUser();
  const createUser = useCreateUser();

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

  const onSubmit = handleSubmit((formData: SnippetForm) => {
    console.log(formData);
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

  return (
    <Center>
      <Box
        maxW="container.md"
        maxH="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        p="6"
        borderRadius="6"
        display="flex"
        flexDirection="column"
      >
        <FormControl as="form" onSubmit={onSubmit} display="flex" flexDirection="column" gridGap="3">
          <Input label="Name" placeholder="Name" {...register('name')} isRequired {...inputStyles} />
          <Select isRequired {...register('language')} {...inputStyles}>
            {languages?.map((l) => (
              <option key={l.id}>{l.name}</option>
            ))}
          </Select>
          <Textarea
            placeholder="Paste your code here"
            resize={'none'}
            h="100vh"
            maxH="md"
            isRequired
            {...register('code')}
            {...inputStyles}
          ></Textarea>
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
