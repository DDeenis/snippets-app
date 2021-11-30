import {Button, ButtonProps} from '@chakra-ui/button';
import {Text} from '@chakra-ui/layout';
import {useRouter} from 'next/dist/client/router';

interface BackButtonProps extends ButtonProps {
  icon: JSX.Element;
  text: string;
  link?: string;
}

export const BottomButton: React.FC<BackButtonProps> = ({icon, text, link, ...props}) => {
  const {push} = useRouter();

  const handleRedirect = () => link && push(link);

  return (
    <Button
      display="flex"
      gridGap="2"
      alignItems="center"
      alignSelf="flex-end"
      mt="auto"
      py={1}
      px={2}
      w="max-content"
      bg="yellow.400"
      borderRadius="lg"
      cursor="pointer"
      onClick={handleRedirect}
      {...props}
    >
      {icon}
      <Text>{text}</Text>
    </Button>
  );
};
