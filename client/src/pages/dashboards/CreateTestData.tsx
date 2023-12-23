import {
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import AccountTypePercentageSelect from '../../components/AccountTypePercentageSelect';
import useCreateTestAccounts from '../../hooks/useCreateTestAccounts';
import RangeSelect from '../../components/RangeSelect';

export default function CreateTestData() {
  const date = new Date();
  const minYear = date.getFullYear() - 7;
  const maxYear = date.getFullYear();

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
            <NumberInput defaultValue={500} value={accountsCreatingAmount} onChange={(e) => updateCreatingAccountsAmount(e)} min={500} max={500 * 1000000}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
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

          <Text as='b'>Other</Text>
         <RangeSelect label='Select account year range' min={minYear} max={maxYear} minStepsBetween={2} step={1}/>
         <RangeSelect label='Select account hours range' min={10} max={15000} minStepsBetween={200} step={1} format={true} />
        </form>
      </Center>
    </Container>
  );
}
