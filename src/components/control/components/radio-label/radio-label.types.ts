import type { ReactNode } from 'react';
import type { RadioChoice, ChoiceValue } from '@/components/control/types';

interface RadioLabelChild {
  focused: boolean;
  hovered: boolean;
  checked: boolean;
  state?: 'idle' | 'error' | 'success';
}

export interface RadioLabelProps<T extends ChoiceValue> {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: 'idle' | 'error' | 'success';
  children: (props: RadioLabelChild) => ReactNode;
}
