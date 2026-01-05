import type { InputProps } from './input.types';
import './input.css';

export const Input = (props: InputProps) => {
  const { id, value, disabled = false, type = 'text', onAutofill, onAutofillCancel, onChange, onFocus, onBlur } = props;
  return (
    <input
      disabled={disabled}
      type={type}
      id={id}
      name={id}
      value={value}
      className="control-input"
      onChange={(e) => onChange(e.target.value, id, 'keyboard')}
      onAnimationStart={(e) => {
        if (e.animationName === 'autofill-start') onAutofill?.call(null, id);
        if (e.animationName === 'autofill-cancel') onAutofillCancel?.call(null, id);
      }}
      onFocus={() => onFocus?.call(null, id)}
      onBlur={() => onBlur?.call(null, id)}
    />
  );
};
