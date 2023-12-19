import { FormEvent, useState } from 'react';
import { LoginProps } from '../../../types/authentication';
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';

export default function Login({ setToken }: LoginProps) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genericError, setGenericError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function attemptLogin(e: FormEvent) {
    e.preventDefault();

    if (!email) {
      setEmailError('Email required!');
      return;
    }

    if (!password) {
      setPasswordError('Password required!');
      return;
    }

    setGenericError('Just testing errors');
    setToken('');
  }

  return (
    <Container maxW="md" maxH="md" centerContent>
      <Heading p="4">Login</Heading>

      {genericError && (
        <Alert status="error">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{genericError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={attemptLogin}>
        <FormControl isInvalid={emailError}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {(!emailError && <FormHelperText>Please enter your email.</FormHelperText>) || (
            <FormErrorMessage>{emailError}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <FormHelperText>
            Please enter the password you used to create your account.
          </FormHelperText>
          {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
        </FormControl>

        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
}
