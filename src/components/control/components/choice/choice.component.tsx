import type { ChoiceProps } from './choice.types';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import './choice.css';

export const Choice = ({
  type,
  checked,
  focused = false,
  hovered = false,
  state = 'idle',
  disabled = false,
}: ChoiceProps) => (
  <div
    className={clsx('control-choice', {
      'control-choice--checked': checked,
      'control-choice--focused': focused,
      'control-choice--hovered': hovered,
      'control-choice--disabled': disabled,
      'control-choice--radio': type === 'radio',
      'control-choice--checkbox': type === 'checkbox',
      'control-choice--idle': state === 'idle',
      'control-choice--error': state === 'error',
      'control-choice--success': state === 'success' || checked,
    })}
  >
    {type === 'radio' && <div className="control-choice__mark" />}
    {type === 'checkbox' && <Check className="control-choice__mark" />}
  </div>
);
