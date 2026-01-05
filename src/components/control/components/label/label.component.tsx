import type { LabelProps } from './label.types';
import clsx from 'clsx';
import './label.css';

export const Label = ({ children, position = 'idle', state = 'idle' }: LabelProps) => (
  <span
    className={clsx('control-label', {
      'control-label--position-idle': position === 'idle',
      'control-label--position-active': position === 'active',
      'control-label--state-idle': state === 'idle',
      'control-label--state-error': state === 'error',
      'control-label--state-success': state === 'success',
    })}
  >
    {children}
  </span>
);
