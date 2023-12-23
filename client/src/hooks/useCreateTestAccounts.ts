import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getRandomArbitrary } from '../helpers/randomNumber';
import { AccountTypes } from '../types/testAccountData';

const defaultCreateAccountsAmount = 500;
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
  },
];

export type createTestAccountsHook = [
  (e: FormEvent) => void,
  string,
  number,
  (e: string) => void,
  AccountTypes[],
  Dispatch<SetStateAction<AccountTypes[]>>,
];

export default function useCreateTestAccounts(): createTestAccountsHook {
  const [accountTypes, setAccountTypes] = useState<AccountTypes[]>([]);
  const [accountsAmountError, setAccountsAmountError] = useState('');

  const [accountsCreatingAmount, setAccountsCreatingAmount] = useState(defaultCreateAccountsAmount);

  useEffect(() => {
    let totalPercentageLeft = 100;

    for (let i = 0; i < accounts.length; i++) {
      if (i === accounts.length - 1) {
        accounts[i].percentage = totalPercentageLeft;
        continue;
      }

      const percentage = getRandomArbitrary(totalPercentageLeft * 0.1, totalPercentageLeft * 0.6);

      accounts[i].percentage = percentage;
      const newValue = Math.round((accounts[i].percentage / 100) * defaultCreateAccountsAmount);
      accounts[i].accountsAmount = newValue;

      totalPercentageLeft -= percentage;

      setAccountTypes([...accounts]);
    }
  }, []);

  useEffect(() => {
    function calculateEachAccountTypeAmount() {
      for (let i = 0; i < accounts.length; i++) {
        const newValue = Math.round((accounts[i].percentage / 100) * accountsCreatingAmount);

        accounts[i].accountsAmount = newValue;
      }

      setAccountTypes([...accounts])
    }

    calculateEachAccountTypeAmount();

  }, [accountsCreatingAmount]);

  function updateCreatingAccountsAmount(e: string){
    setAccountsCreatingAmount(parseInt(e))
  }

  function attemptCreateTestData(e: FormEvent) {
    e.preventDefault();

    if (!accountsCreatingAmount) {
      setAccountsAmountError('Please enter a number!');
      return;
    }

    if (isNaN(accountsCreatingAmount)) {
      setAccountsAmountError('Invalid number!');
      return;
    }
  }

  return [
    attemptCreateTestData,
    accountsAmountError,
    accountsCreatingAmount,
    updateCreatingAccountsAmount,
    accountTypes,
    setAccountTypes,
  ];
}
