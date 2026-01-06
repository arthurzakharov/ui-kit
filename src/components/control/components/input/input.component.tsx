import type { InputProps } from '@/components/control/components/input/input.types';
import cn from '@/components/control/components/input/input.module.css';

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
