import type { Interactive, RadioChoice, ChoiceValue, State } from '@/components/control/types';

export interface CardImageProps extends Interactive<ChoiceValue> {
  sprite: string;
  choices: RadioChoice[];
  state?: State;
}
