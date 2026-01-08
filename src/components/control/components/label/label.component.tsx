import type { PropsWithChildren } from 'react';
import type { State } from '../../types';
import clsx from 'clsx';
import cn from './label.module.css';

export interface LabelProps extends PropsWithChildren {
  state?: State;
  position?: 'idle' | 'active';
}

export const Label = (props: LabelProps) => {
  const { children, position = 'idle', state = 'idle' } = props;

  return (
    <span
      className={clsx(cn.Label, {
        [cn.LabelPositionIdle]: position === 'idle',
        [cn.LabelPositionActive]: position === 'active',
        [cn.LabelStateIdle]: state === 'idle',
        [cn.LabelStateError]: state === 'error',
        [cn.LabelStateSuccess]: state === 'success',
      })}
    >
      {children}
    </span>
  );
};
