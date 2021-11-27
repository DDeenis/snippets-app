import {useUser} from '@auth0/nextjs-auth0';
import {Center, Flex, Text, Link as HtmlLink} from '@chakra-ui/layout';
import {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {routes} from '../../constants/routes';
import Link from 'next/link';

type navRoutes = typeof routes['nav'];
type navRouteKeys = keyof navRoutes;

export const Navigation: NextPage = () => {
  const {user, isLoading} = useUser();
  const {pathname} = useRouter();

  const isAuth = !isLoading && Boolean(user);
  const signLink = isAuth ? routes.auth.logout : routes.auth.login;
  const signText = isAuth ? 'Logout' : 'Login';
  const createLink = isAuth ? routes.nav.createSnippet : routes.auth.login;

  const linkActive = {color: 'yellow.400'};
  const linkHover = {textDecoration: 'underline'};
  const linkStyles: Record<string, object> = {};

  for (const pathName in routes.nav) {
    const path = routes.nav[pathName as navRouteKeys];
    console.log(path, pathname, path === pathname);
    linkStyles[path] = path === pathname ? linkActive : {};
  }

  return (
    <Center as="header">
      <Flex as="nav" direction="column" gridGap="6" justify="center" alignItems="center" my={3}>
        <Text color="yellow.100" fontSize="4xl" fontWeight="semibold">
          Snippets App
        </Text>
        <Flex justify="center" alignItems="center" gridGap="6" textAlign="center">
          <Text
            color="yellow.100"
            fontWeight="normal"
            fontSize="md"
            _hover={linkHover}
            {...linkStyles[routes.nav.allSnippets]}
          >
            <Link href={routes.nav.allSnippets}>All Snippets</Link>
          </Text>
          {isAuth && (
            <Text
              color="yellow.100"
              fontWeight="normal"
              fontSize="md"
              _hover={linkHover}
              {...linkStyles[routes.nav.mySnippets]}
            >
              <Link href={routes.nav.mySnippets}>My Snippets</Link>
            </Text>
          )}
          <Text
            color="yellow.100"
            fontWeight="normal"
            fontSize="md"
            _hover={linkHover}
            {...linkStyles[routes.nav.createSnippet]}
          >
            <Link href={createLink}>Add Snippet</Link>
          </Text>
          {isAuth && (
            <Text
              color="yellow.100"
              fontWeight="normal"
              fontSize="md"
              _hover={linkHover}
              {...linkStyles[routes.nav.profile]}
            >
              <Link href={routes.nav.profile}>Profile</Link>
            </Text>
          )}
          <Text color="yellow.100" fontWeight="normal" fontSize="md" _hover={linkHover}>
            <HtmlLink href={signLink}>{signText}</HtmlLink>
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
};
