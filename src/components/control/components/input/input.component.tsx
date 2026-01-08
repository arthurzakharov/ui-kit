import type { HTMLInputTypeAttribute } from 'react';
import type { Interactive } from '../../types';
import cn from './input.module.css';

export interface InputProps extends Interactive<string> {
  type?: HTMLInputTypeAttribute;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}

export const Input = ({
  id,
  value,
  disabled = false,
  type = 'text',
  onAutofill,
  onAutofillCancel,
  onChange,
  onFocus,
  onBlur,
}: InputProps) => (
  <input
    data-testid="input"
    disabled={disabled}
    type={type}
    id={id}
    name={id}
    value={value}
    className={cn.Input}
    onChange={(e) => onChange(e.target.value, id, 'keyboard')}
    onAnimationStart={(e) => {
      if (e.animationName === cn['autofill-start']) onAutofill?.call(null, id);
      if (e.animationName === cn['autofill-cancel']) onAutofillCancel?.call(null, id);
    }}
    onFocus={() => onFocus?.call(null, id)}
    onBlur={() => onBlur?.call(null, id)}
  />
);
