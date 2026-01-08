import type { Interactive, State } from '@/components/control/types';

export interface TextareaProps extends Interactive<string> {
  state?: State;
  placeholder?: string;
  rows?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}
