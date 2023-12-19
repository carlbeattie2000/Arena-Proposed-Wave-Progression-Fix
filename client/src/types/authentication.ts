import { Dispatch, SetStateAction } from 'react';

export interface LoginProps {
  setToken: Dispatch<SetStateAction<string>>;
}
