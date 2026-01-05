import type { PropsWithChildren } from 'react';
import type { Interactive, State } from '../../types';

export interface CheckboxProps extends PropsWithChildren, Interactive<boolean> {
  state?: State;
}
