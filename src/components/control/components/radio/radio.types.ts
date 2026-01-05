import type { Interactive, RadioChoice, State } from '../../types';

type Orientation = 'horizontal' | 'vertical';

export interface RadioProps extends Interactive<string> {
  orientation: Orientation;
  choices: RadioChoice[];
  state?: State;
}
