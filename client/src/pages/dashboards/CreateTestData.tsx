import { Center, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text  } from '@chakra-ui/react';
import Nav from '../../components/Nav';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AccountTypes } from '../../types/testAccountData';
import { getRandomArbitrary } from '../../helpers/randomNumber';

const accounts: AccountTypes[] = [
  {
    name: 'Standard',
    percentage: 0,
    accountsAmount: 0,
  },
  {
    name: 'Left Beyond',
    percentage: 0,
    accountsAmount: 0,
  },
  {
    name: 'Prepare for Departure',
    percentage: 0,
    accountsAmount: 0,
  },
  {
    name: 'Borderline of Darkness',
    percentage: 0,
    accountsAmount: 0,
  },
  {
    name: 'Arena',
    percentage: 0,
    accountsAmount: 0,
  }
]

export default function CreateTestData() {
  const [accountTypes, setAccountTypes] = useState<AccountTypes[]>([]);
  const [accountsAmountError, setAccountsAmountError] = useState("");

  const [accountsCreatingAmount, setAccountsCreatingAmount] = useState(0);

  // Have all sliders update when one is <channged></channged>
  // Correctly adjust the other sliders when one is changed so they all equal no more than 100%

  useEffect(() => {
    let totalPercentageLeft = 100;

    for (let i = 0; i < accounts.length; i++) {
      if (i === accounts.length - 1) {
        accounts[i].percentage = totalPercentageLeft;
        continue;
      }

      const percentage = getRandomArbitrary(totalPercentageLeft * 0.1, totalPercentageLeft * 0.6)

      accounts[i].percentage = percentage;
      totalPercentageLeft -= percentage;
    }

    setAccountTypes(accounts);
  }, [accountTypes])

  function updateSliderValues(e: number, name: string) {
    const accountIncreasing = accountTypes.filter(type => type.name === name)[0];
    const increasedAmount = accountIncreasing.percentage - e;
    accountIncreasing.percentage = e;

    const accountsToUpdate = accountTypes.filter(type => type.name != name);
    const amountToAdd = increasedAmount / accountsToUpdate.length;

    accountsToUpdate.forEach((account) => account.percentage += amountToAdd);
    setAccountTypes([...accountTypes]);
    calculateEachAccountTypeAmount();
  }

  function updateCreatingAccountsAmount(e: ChangeEvent<HTMLInputElement>) {
    setAccountsCreatingAmount(parseInt(e.target.value));

    calculateEachAccountTypeAmount();
  }

  function attemptCreateTestData(e: FormEvent) {
    e.preventDefault();

    if (!accountsCreatingAmount) {
      setAccountsAmountError("Please enter a number!");
      return;
    }

    if (isNaN(accountsCreatingAmount)) {
      setAccountsAmountError("Invalid number!");
      return;
    }
  }

  function calculateEachAccountTypeAmount() {
    for (let i = 0; i < accounts.length; i++) {
      accounts[i].accountsAmount = Math.floor(accountsCreatingAmount * (accounts[i].percentage / 10));
    }
  }

  return (
      <Container maxW='xxl' maxH='xxl' centerContent>
      <Nav />

      <Heading>Create Test Data</Heading>

      <Center>
        <form onSubmit={attemptCreateTestData}>
          <FormControl isInvalid={accountsAmountError !== ""}>
            <FormLabel>Ammount of accounts to create</FormLabel>
            <Input type='number' value={accountsCreatingAmount} onChange={(e) => updateCreatingAccountsAmount(e)} />
            {accountsAmountError && <FormErrorMessage>{accountsAmountError}</FormErrorMessage>}
          </FormControl>

          <Text as='b'>
            Account Type Percentage
          </Text>

          {accountTypes.map((accountType, i) => {
            return (
              <FormControl key={i}>
                <FormLabel>{accountType.name} {accountType.accountsAmount}</FormLabel>

                <Slider aria-label='slider-ex-1' defaultValue={accountType.percentage} onChangeEnd={(e) => updateSliderValues(e, accountType.name)}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              )
          })}
        </form>
      </Center>
      </Container>
      )
}
