import { Check, Circle, X } from 'lucide-react';
import clsx from 'clsx';
import type { State } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/primitives/status/status.module.css';

export interface StatusProps extends Base {
  state: State;
}

export const Status = ({
  // Status props
  state,
  // Base props
  ...base
}: StatusProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'status')}
    className={clsx(cn.Status, baseProps(base, 'className'), {
      [cn.Idle]: state === 'idle',
      [cn.Success]: state === 'success',
      [cn.Error]: state === 'error',
    })}
  >
    <Circle className={cn.Circle} />
    <X className={cn.X} />
    <Check className={cn.Check} />
  </div>
);
