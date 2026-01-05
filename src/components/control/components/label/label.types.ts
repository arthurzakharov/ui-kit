import type { PropsWithChildren } from 'react';
import type { State } from '../../types';

export interface LabelProps extends PropsWithChildren {
  state?: State;
  position?: 'idle' | 'active';
}
