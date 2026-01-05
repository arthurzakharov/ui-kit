import type { Interactive, RadioChoice, ChoiceValue, State } from '../../types';

export interface CardImageProps extends Interactive<ChoiceValue> {
  sprite: string;
  choices: RadioChoice[];
  state?: State;
}
