import type { ChangeEvent, MouseEvent, PropsWithChildren } from 'react';
import type { Interactive, State } from '../../types';
import { useToggle } from 'usehooks-ts';
import { Choice, type ChoiceProps } from '../choice/choice.component';
import { HiddenInput } from '../hidden-input/hidden-input.component';
import { Converter } from '../../../../utils/converter/converter';
import cn from './checkbox.module.css';

export interface CheckboxProps extends PropsWithChildren, Interactive<boolean> {
  state?: State;
  size?: ChoiceProps['size'];
}

export const Checkbox = (props: CheckboxProps) => {
  const { children, state = 'idle', size = 'md', id, value, disabled = false, onChange, onFocus, onBlur } = props;

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
      <HiddenInput
        type="checkbox"
        id={id}
        name={id}
        value={Converter.Boolean.ToBooleanString(value)}
        checked={value}
        disabled={disabled}
        onChange={onInputChange}
      />
      <div className={cn.CheckboxChoice}>
        <Choice
          type="checkbox"
          size={size}
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
