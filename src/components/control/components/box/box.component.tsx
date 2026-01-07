import type { BoxProps } from '@/components/control/components/box/box.types';
import { forwardRef } from 'react';
import clsx from 'clsx';
import cn from '@/components/control/components/box/box.module.css';

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, className, focused = false, checked = false, state = 'idle', onClick } = props;

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
