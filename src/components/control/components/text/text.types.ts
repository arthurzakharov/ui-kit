import type { InputProps } from '@/components/control/components/input/input.types';
import type { State } from '@/components/control/types';

export interface TextProps extends InputProps {
  label: string;
  state?: State;
}
