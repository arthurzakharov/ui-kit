import type { LabelProps } from '@/components/control/components/label/label.types';
import clsx from 'clsx';
import cn from '@/components/control/components/label/label.module.css';

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
