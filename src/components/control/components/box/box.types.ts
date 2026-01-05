import type { PropsWithChildren } from 'react';
import type { State } from '../../types';

export interface BoxProps extends PropsWithChildren {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
}
