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
  function percentageDistribution(accounts: AccountTypes[], usedPercentage: number, increasedAmount: number, name: string): AccountTypes[] {
    const percentageLeft = 100 - usedPercentage;
    const accountsUpdating = accounts.filter(acc => acc.name !== name && acc.percentage !== 0);

    if (percentageLeft == 0) {
      for (const account of accountsUpdating) {
        account.percentage = 0;
      }

      return accounts;
    }

    const changedAmountForEach = Math.round((increasedAmount / accountsUpdating.length) * 1000) / 1000;

    for (const account of accountsUpdating) {
      account.percentage += Math.round(-(changedAmountForEach) * 100) / 100;

      if (account.percentage < 0) {
        account.percentage = 0;
      }
    }

    const total = accounts.reduce((x, y) => x+=y.percentage, 0);
    const percentageBellowFull = 100 - total > 0;

    if (percentageBellowFull) {
      accountsUpdating[0].percentage += 100 - total;
    }

    return accounts;
}

  function updateSliderValues(e: number, name: string) {
    const accountTypesCopy: AccountTypes[] = JSON.parse(JSON.stringify(accountTypes));

    const accountIncreasing = accountTypesCopy.filter((type) => type.name === name)[0];
    const changedAmount = e - accountIncreasing.percentage;

    const allAtZeroSpareTypeUpdating = accountTypesCopy.every(acc => {
      if (acc.name === name && acc.percentage !== 0) {
        return true;
      }

      if (acc.percentage === 0) {
        return true;
      }
    });
    const isAboveMaxPercentage = accountIncreasing.percentage + changedAmount > 100;

    if (isAboveMaxPercentage || (allAtZeroSpareTypeUpdating)) {
      return;
    }

    accountIncreasing.percentage += changedAmount;

    const updatedAccountTypes = percentageDistribution(accountTypesCopy, e, changedAmount, accountIncreasing.name);
    setAccountTypes([...updatedAccountTypes]);
    calculateEachAccountTypeAmount(updatedAccountTypes);
  }

  function calculateEachAccountTypeAmount(accounts: AccountTypes[]) {
    for (let i = 0; i < accounts.length; i++) {
      const newValue = Math.round((accounts[i].percentage / 100) * accountsCreatingAmount);

      accounts[i].accountsAmount = newValue;
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
        value={account.percentage}
        step={1}
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
