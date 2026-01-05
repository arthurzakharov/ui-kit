import type { Interactive, RadioChoice, ChoiceValue, State } from '../../types';

export interface CardTextProps extends Interactive<ChoiceValue> {
  choices: RadioChoice[];
  state?: State;
}
