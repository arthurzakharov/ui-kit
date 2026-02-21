import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { State } from '@controls/utils/types';
import type { Base } from '@utils/types';
import cn from '@controls/control-label/control-label.module.css';

export interface ControlLabelProps extends Base, PropsWithChildren {
  state?: State;
  position?: 'idle' | 'active';
}

export const ControlLabel = (props: ControlLabelProps) => {
  const { children, position = 'idle', state = 'idle', className } = props;

  return (
    <span
      className={clsx(cn.Label, className, {
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
