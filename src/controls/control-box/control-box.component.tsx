import { type PropsWithChildren, forwardRef } from 'react';
import clsx from 'clsx';
import type { State } from '@controls/utils/types';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@controls/control-box/control-box.module.css';

export interface ControlBoxProps extends PropsWithChildren<Base> {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

/**
 * `ControlBox` provides a consistent frame for checkbox/radio-like controls. It handles visual
 * states (`idle`, `error`, `success`) plus `focused` and `checked` modifiers.
 */
export const ControlBox = forwardRef<HTMLDivElement, ControlBoxProps>(
  ({ children, focused = false, checked = false, state = 'idle', onClick = () => {}, ...base }, ref) => (
    <div
      data-testid={baseProps(base, 'data-testid', 'control-box')}
      ref={ref}
      className={clsx(cn.ControlBox, baseProps(base, 'className'), {
        [cn.Focused]: focused,
        [cn.Checked]: checked,
        [cn.Idle]: state === 'idle',
        [cn.Error]: state === 'error',
        [cn.Success]: state === 'success',
      })}
      onClick={() => onClick()}
    >
      {children}
    </div>
  ),
);
