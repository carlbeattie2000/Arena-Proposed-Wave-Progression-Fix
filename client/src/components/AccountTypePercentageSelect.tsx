import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { AccountTypes } from '../types/testAccountData';
import { Dispatch, SetStateAction } from 'react';

interface AccountTypePercentageSelectProps {
  account: AccountTypes;
  accountTypes: AccountTypes[];
  accountsCreatingAmount: number;
  setAccountTypes: Dispatch<SetStateAction<AccountTypes[]>>;
}

export default function AccountTypePercentageSelect({
  account,
  accountTypes,
  accountsCreatingAmount,
  setAccountTypes,
}: AccountTypePercentageSelectProps) {
  function rebalancePercentages(usedPercentage: number, name: string): AccountTypes[] {
    const percentageLeft = 100 - usedPercentage;
    const accountsUpdating = accountTypes.filter(acc => acc.name !== name && acc.percentage !== 0);

    let percentageForEachAccount = 0;

    if (percentageLeft > 0) {
      percentageForEachAccount = percentageLeft / accountsUpdating.length;
    }

    for (const account of accountsUpdating) {
      account.percentage = percentageForEachAccount;
    }

    return accountTypes;
  }

  function percentageDistribution(usedPercentage: number, increasedAmount: number, name: string) {
    const percentageLeft = 100 - usedPercentage;
    const accountsUpdating = accountTypes.filter(acc => acc.name !== name && acc.percentage !== 0);

    for (const account of accountsUpdating) {
      // if negative take
      // if positive add
    }

}

  function updateSliderValues(e: number, name: string) {
    const accountIncreasing = accountTypes.filter((type) => type.name === name)[0];
    const changedAmount = e - accountIncreasing.percentage;

    const accountTypeChangingAtZero = accountIncreasing.percentage === 0;
    const allAtZero = accountTypes.filter(acc => acc.name !== name).every(acc => acc.percentage === 0);
    const isAboveMaxPercentage = accountIncreasing.percentage + changedAmount > 100;

    if (isAboveMaxPercentage || (allAtZero && !accountTypeChangingAtZero)) {
      return;
    }

    accountIncreasing.percentage += changedAmount;

    rebalancePercentages(e, accountIncreasing.name);
    setAccountTypes([...accountTypes]);
    calculateEachAccountTypeAmount();
  }

  function calculateEachAccountTypeAmount() {
    for (let i = 0; i < accountTypes.length; i++) {
      accountTypes[i].accountsAmount = Math.floor(
        accountsCreatingAmount * (accountTypes[i].percentage / 100),
      );
    }
  }

  return (
    <FormControl>
      <FormLabel>
        {account.name} {account.accountsAmount}
      </FormLabel>

      <Slider
        aria-label="slider-ex-1"
        defaultValue={account.percentage}
        onChange={(e) => updateSliderValues(e, account.name)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
}
