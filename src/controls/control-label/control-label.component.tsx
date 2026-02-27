import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { State } from '@controls/utils/types';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@controls/control-label/control-label.module.css';

interface ControlLabelProps extends PropsWithChildren<Base> {
  state?: State;
  position?: 'idle' | 'active';
}

/**
 * `ControlLabel` renders field label text with active/idle positioning and validation color states.
 * Use it to keep label behavior and appearance consistent across inputs.
 */
export const ControlLabel = ({ children, position = 'idle', state = 'idle', ...base }: ControlLabelProps) => (
  <span
    data-testid={baseProps(base, 'data-testid', 'control-label')}
    className={clsx(cn.ControlLabel, baseProps(base, 'className'), {
      [cn.Idle]: position === 'idle',
      [cn.Active]: position === 'active',
      [cn.Error]: state === 'error',
      [cn.Success]: state === 'success',
    })}
  >
    {children}
  </span>
);
