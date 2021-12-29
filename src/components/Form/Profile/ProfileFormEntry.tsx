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
}

export function ProfleFormEntry<T>({
  label,
  control,
  name,
  ...props
}: React.PropsWithChildren<ProfleFormEntryProps<T>>): JSX.Element {
  const {
    field,
    fieldState: {error},
  } = useController({
    name,
    control,
    rules: {required: true},
  });

  return (
    <Box display="flex" flexDirection="column" gridGap="1">
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <Input maxW="400px" isInvalid={Boolean(error)} {...props} {...field} />
      <ErrorMessage message={error?.message} />
    </Box>
  );
}
