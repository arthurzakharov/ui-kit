import { forwardRef, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { State } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/primitives/box/box.module.css';

export interface BoxProps extends PropsWithChildren<Base> {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      state = 'idle',
      focused = false,
      checked = false,
      onClick = () => {},
      // Base props
      ...base
    },
    ref,
  ) => (
    <div
      data-testid={baseProps(base, 'data-testid', 'box')}
      ref={ref}
      className={clsx(cn.Box, baseProps(base, 'className'), {
        [cn.Idle]: state === 'idle' && !focused && !checked,
        [cn.Error]: state === 'error' && !focused && !checked,
        [cn.Success]: state === 'success' && !focused && !checked,
        [cn.Focused]: focused,
        [cn.Checked]: checked,
      })}
      onClick={() => onClick()}
    >
      {children}
    </div>
  ),
);
