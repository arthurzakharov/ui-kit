import type { HTMLInputTypeAttribute } from 'react';
import type { Interactive } from '@/components/control/types';

export interface InputProps extends Interactive<string> {
  type?: HTMLInputTypeAttribute;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}
