import type { ChangeEvent, MouseEvent } from 'react';
import type { CheckboxProps } from '@/components/control/components/checkbox/checkbox.types';
import { useToggle } from 'usehooks-ts';
import { Control } from '@/components/control';
import { Converter } from '@/utils';
import cn from '@/components/control/components/checkbox/checkbox.module.css';

export const Checkbox = (props: CheckboxProps) => {
  const { children, state = 'idle', id, value, disabled = false, onChange, onFocus, onBlur } = props;

  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  const onLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
    if (disabled || focused) return;
    e.preventDefault();
    onChange(!value, id);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.stopPropagation();
    onChange(!value, id);
  };

  const onInputFocus = () => {
    if (disabled) return;
    toggleFocused();
    onFocus?.call(null, id);
  };

  const onInputBlur = () => {
    if (disabled) return;
    toggleFocused();
    onBlur?.call(null, id);
  };

  return (
    <label
      htmlFor={id}
      className={cn.Checkbox}
      onClick={onLabelClick}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      onMouseEnter={() => toggleHovered()}
      onMouseLeave={() => toggleHovered()}
    >
      <Control.HiddenInput
        type="checkbox"
        id={id}
        name={id}
        value={Converter.Boolean.ToBooleanString(value)}
        checked={value}
        disabled={disabled}
        onChange={onInputChange}
      />
      <div className={cn.CheckboxChoice}>
        <Control.Choice
          type="checkbox"
          state={state}
          checked={value}
          focused={focused}
          hovered={hovered}
          disabled={disabled}
        />
      </div>
      <div className={cn.CheckboxContent}>{children}</div>
    </label>
  );
};
