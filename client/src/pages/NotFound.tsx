import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Link } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container maxW="xxl" maxH="xxl" centerContent>
      <Heading>Page Not Found</Heading>
      <RouterLink to="/dashboard">
        <Link>Return Home</Link>
      </RouterLink>
    </Container>
  );
}
