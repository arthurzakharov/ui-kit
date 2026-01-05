import type { State } from '../../types';

export interface ChoiceProps {
  type: 'radio' | 'checkbox';
  checked: boolean;
  focused?: boolean;
  hovered?: boolean;
  state?: State;
  disabled?: boolean;
}
