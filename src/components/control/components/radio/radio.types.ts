import type { Interactive, RadioChoice, State } from '@/components/control/types';

export interface RadioProps extends Interactive<string> {
  orientation: 'horizontal' | 'vertical';
  choices: RadioChoice[];
  state?: State;
}
