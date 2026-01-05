import type { InputProps } from '../input/input.types';
import type { State } from '../../types';

export interface TextProps extends InputProps {
  label: string;
  state?: State;
}
