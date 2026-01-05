import type { HTMLInputTypeAttribute } from 'react';
import type { Interactive } from '../../types';

export interface InputProps extends Interactive<string> {
  type?: HTMLInputTypeAttribute;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}
