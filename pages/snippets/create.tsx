import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {FormControl} from '@chakra-ui/form-control';
import {CloseIcon, CheckIcon} from '@chakra-ui/icons';
import {Input} from '@chakra-ui/input';
import {Box, Center} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {GetServerSideProps, NextPage} from 'next';
import {useForm} from 'react-hook-form';
import {BottomButton} from '../../src/components/BackButton/BackButton';
import {routes} from '../../src/constants/routes';

const CreateSnippet: NextPage = () => {
  const {register, handleSubmit} = useForm();

  const onSubmit = handleSubmit((formData: any) => {
    console.log(formData);
  });

  const inputStyles = {
    borderColor: 'yellow.600',
    color: 'black',
    _placeholder: {
      color: 'rgba(0, 0, 0, 0.6)',
    },
    _hover: {
      borderColor: 'yellow.500',
    },
  };

  return (
    <Center>
      <Box
        maxW="container.md"
        minH="container.md"
        w="100%"
        bg="yellow.200"
        boxShadow="md"
        mt="6"
        p="6"
        borderRadius="6"
        display="flex"
        flexDirection="column"
      >
        <FormControl onSubmit={onSubmit} display="flex" flexDirection="column" gridGap="3">
          <Input label="Name" placeholder="Name" {...register('name')} isRequired {...inputStyles} />
          <Select {...inputStyles}></Select>
        </FormControl>
        <Box mt="auto" display="flex" gridGap="3">
          <BottomButton icon={<CheckIcon />} text={'Submit'} type="submit" />
          <BottomButton icon={<CloseIcon />} text={'Cancel'} link={routes.nav.allSnippets} type="button" />
        </Box>
      </Box>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default CreateSnippet;
