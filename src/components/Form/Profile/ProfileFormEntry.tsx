import {InputProps} from '@chakra-ui/input';
import {Box, Text} from '@chakra-ui/layout';
import React from 'react';
import {Control, Path, useController} from 'react-hook-form';
import {ErrorMessage} from '../ErrorMessage';
import {Input} from '../Input';

interface ProfleFormEntryProps<T> extends InputProps {
  control: Control<T, object>;
  name: Path<T>;
  label: string;
  error?: string;
}

export function ProfleFormEntry<T>({
  label,
  error,
  control,
  name,
  ...props
}: React.PropsWithChildren<ProfleFormEntryProps<T>>): JSX.Element {
  const {field, fieldState, formState} = useController({
    name,
    control,
    rules: {required: true},
  });

  return (
    <Box display="flex" flexDirection="column" gridGap="1">
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <Input maxW="400px" {...props} {...field} {...fieldState} {...formState} />
      <ErrorMessage message={error} />
    </Box>
  );
}
