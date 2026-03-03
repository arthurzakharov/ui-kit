import { forwardRef } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { ControlBoxProps } from '@controls/control-box/control-box.types';
import cn from '@controls/control-box/control-box.module.css';

export const ControlBox = forwardRef<HTMLDivElement, ControlBoxProps>(
  ({ children, state = 'idle', focused = false, checked = false, onClick, ...base }, ref) => (
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
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  ),
);
