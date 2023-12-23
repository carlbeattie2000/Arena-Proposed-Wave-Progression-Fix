import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Link } from '@chakra-ui/react';
import ShortcutSearchPopup from '../components/ShortcutSearchPopup';
import { useState } from 'react';

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container maxW="xxl" maxH="xxl" centerContent>
      <ShortcutSearchPopup isOpen={isOpen} setIsOpen={setIsOpen} modifier="shift" shortcutKey="B" label="search for user" />
      <Heading>Page Not Found</Heading>
      <RouterLink to="/dashboard">
        <Link>Return Home</Link>
      </RouterLink>
    </Container>
  );
}
