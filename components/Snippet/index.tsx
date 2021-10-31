import {Box, Container, Text} from '@chakra-ui/layout';
import {NextPage} from 'next';
import {Snippet} from '../../query/snippets/snippets';
import {Accordion, AccordionIcon, AccordionPanel, AccordionButton, AccordionItem} from '@chakra-ui/accordion';
import Link from 'next/link';

interface SnippetProps {
  snippet: Snippet;
  preview?: boolean;
}

const SnippetComponent: NextPage<SnippetProps> = ({snippet, preview = true}) => {
  const prismaLangClassName = `language-${snippet.Language.name.toLowerCase()}`;

  const codeSection = (
    <pre style={{margin: 0}} className={prismaLangClassName}>
      <code>{snippet.code}</code>
    </pre>
  );

  return (
    <Container mx={'auto'} py={6} bg="yellow.300" maxW="container.sm" borderRadius="lg">
      <Box mb={3} display="flex" justifyContent="space-between" gridGap={1}>
        <Box py={1} px={2} w="max-content" bg="yellow.400" borderRadius="lg">
          <Text isTruncated>{snippet.Language.name}</Text>
        </Box>
        <Box py={1} px={2} maxW="max-content" bg="yellow.400" borderRadius="lg">
          <Link href={`/users/${snippet.User.id}`}>{`${snippet.User.firstName} ${snippet.User.lastName}`}</Link>
        </Box>
      </Box>
      <Box mx="auto" py={2} bg={'orange.800'} borderRadius="md">
        <Text fontSize="lg" textAlign="center" color="orange.100">
          <Link href={`/snippets/${snippet.id}`}>{snippet.name}</Link>
        </Text>
      </Box>
      <Box mt={3}>
        {preview ? (
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton bg="yellow.400" _focus={{boxShadow: 'none'}} _hover={{background: 'yellow.400'}}>
                <Box flex="1" textAlign="left">
                  Show code
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0} bg="orange.300">
                {codeSection}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          codeSection
        )}
      </Box>
    </Container>
  );
};

export default SnippetComponent;
