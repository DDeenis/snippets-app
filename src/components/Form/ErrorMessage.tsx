import {Text} from '@chakra-ui/layout';
import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  if (!message) return null;

  const capitalizedMessage = message[0].toUpperCase() + message.substr(1);

  return (
    <Text color="red.500" fontSize="sm">
      {capitalizedMessage}
    </Text>
  );
};
