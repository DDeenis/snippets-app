import {InputProps} from '@chakra-ui/input';
import {Box, Text} from '@chakra-ui/layout';
import {FC} from 'react';
import {Input} from '../Input';

interface ProfleFormEntryProps extends InputProps {
  label: string;
}

export const ProfleFormEntry: FC<ProfleFormEntryProps> = ({label, ...props}) => {
  return (
    <Box display="flex" flexDirection="column" gridGap="1">
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <Input label="Name" placeholder="Name" maxW="400px" {...props} />
    </Box>
  );
};
