import { forwardRef } from 'react';
import type { State } from '@controls/utils/types';
import clsx from 'clsx';
import type { BaseWithChildren } from '@utils/types';
import cn from '@controls/control-box/control-box.module.css';

export type ControlBoxProps = {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  onClick?: () => void;
} & BaseWithChildren;

export const ControlBox = forwardRef<HTMLDivElement, ControlBoxProps>((props, ref) => {
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
