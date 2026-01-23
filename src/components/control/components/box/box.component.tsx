import { forwardRef, type PropsWithChildren } from 'react';
import type { State } from '@components/control/control.types';
import clsx from 'clsx';
import cn from '@components/control/components/box/box.module.css';

export interface BoxProps extends PropsWithChildren {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, className, focused, checked = false, state = 'idle', onClick } = props;

  return (
    <div
      data-testid="box"
      ref={ref}
      className={clsx(cn.Box, className, {
        [cn.BoxFocused]: focused,
        [cn.BoxChecked]: checked,
        [cn.BoxStateIdle]: state === 'idle',
        [cn.BoxStateError]: state === 'error',
        [cn.BoxStateSuccess]: state === 'success',
      })}
      onClick={() => onClick?.call(null)}
    >
      {children}
    </div>
  );
});
