import {chakra, Input as ChakraInput} from '@chakra-ui/react';

export const Input = chakra(ChakraInput, {
  baseStyle: {
    borderColor: 'yellow.600',
    color: 'black',
    _placeholder: {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    _hover: {
      borderColor: 'yellow.500',
    },
  },
});
