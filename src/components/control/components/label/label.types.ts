import type { PropsWithChildren } from 'react';
import type { State } from '@/components/control/types';

type LabelPosition = 'idle' | 'active';

export interface LabelProps extends PropsWithChildren {
  state?: State;
  position?: LabelPosition;
}
