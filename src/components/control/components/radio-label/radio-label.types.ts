import type { ReactNode } from 'react';
import type { RadioChoice, ChoiceValue, State } from '../../types';

interface RadioLabelChild {
  focused: boolean;
  hovered: boolean;
  checked: boolean;
  state?: State;
}

export interface RadioLabelProps<T extends ChoiceValue> {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: State;
  children: (props: RadioLabelChild) => ReactNode;
}
