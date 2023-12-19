import {
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import AccountTypePercentageSelect from '../../components/AccountTypePercentageSelect';
import useCreateTestAccounts from '../../hooks/useCreateTestAccounts';

export default function CreateTestData() {
  const [
    attemptCreateTestData,
    accountsAmountError,
    accountsCreatingAmount,
    updateCreatingAccountsAmount,
    accountTypes,
    setAccountTypes,
  ] = useCreateTestAccounts();

  return (
    <Container maxW="xxl" maxH="xxl" centerContent>
      <Nav />

      <Heading>Create Test Data</Heading>

      <Center>
        <form onSubmit={attemptCreateTestData}>
          <FormControl isInvalid={accountsAmountError !== ''}>
            <FormLabel>Ammount of accounts to create</FormLabel>
            <Input
              type="number"
              value={accountsCreatingAmount}
              onChange={(e) => updateCreatingAccountsAmount(e)}
            />
            {accountsAmountError && <FormErrorMessage>{accountsAmountError}</FormErrorMessage>}
          </FormControl>

          <Text as="b">Account Type Percentage</Text>
          {accountTypes.map((accountType, i) => {
            return (
              <AccountTypePercentageSelect
                key={i}
                account={accountType}
                accountTypes={accountTypes}
                accountsCreatingAmount={accountsCreatingAmount}
                setAccountTypes={setAccountTypes}
              />
            );
          })}
        </form>
      </Center>
    </Container>
  );
}
