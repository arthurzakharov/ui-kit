import type { BoxProps } from './box.types';
import clsx from 'clsx';
import { forwardRef } from 'react';
import './box.css';

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, focused = false, checked = false, state = 'idle', onClick }, ref) => (
    <div
      ref={ref}
      className={clsx('control-box', className, {
        'control-box--focused': focused,
        'control-box--checked': checked,
        'control-box--idle': state === 'idle',
        'control-box--error': state === 'error',
        'control-box--success': state === 'success',
      })}
      onClick={() => onClick?.call(null)}
    >
      {children}
    </div>
  ),
);
