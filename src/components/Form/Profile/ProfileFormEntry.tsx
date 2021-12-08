import {InputProps} from '@chakra-ui/input';
import {Box, Text} from '@chakra-ui/layout';
import {FC} from 'react';
import {ErrorMessage} from '../ErrorMessage';
import {Input} from '../Input';

interface ProfleFormEntryProps extends InputProps {
  label: string;
  error?: string;
}

export const ProfleFormEntry: FC<ProfleFormEntryProps> = ({label, error, ...props}) => {
  return (
    <Box display="flex" flexDirection="column" gridGap="1">
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <Input maxW="400px" {...props} />
      <ErrorMessage message={error} />
    </Box>
  );
};
