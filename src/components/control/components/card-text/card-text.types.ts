import type { Interactive, RadioChoice, ChoiceValue, State } from '@/components/control/types';

export interface CardTextProps extends Interactive<ChoiceValue> {
  choices: RadioChoice[];
  state?: State;
}
