import {Box, Text} from '@chakra-ui/layout';
import {FC} from 'react';

interface ProfleInfoEntryProps {
  label: string;
  value?: string;
}

export const ProfleInfoEntry: FC<ProfleInfoEntryProps> = ({label, value}) => {
  return (
    <Box display="flex" flexDirection="column" gridGap="1">
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <Text fontSize="1rem">{value}</Text>
    </Box>
  );
};
