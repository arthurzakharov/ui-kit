import type { ChangeEvent, MouseEvent } from 'react';
import type { CheckboxProps } from './checkbox.types';
import { useToggle } from 'usehooks-ts';
import { Choice } from '../choice';
import { HiddenInput } from '../hidden-input';
import { Converter } from '../../../../utils/converter';
import './checkbox.css';

export const Checkbox = (props: CheckboxProps) => {
  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  const onLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
    if (props.disabled || focused) return;
    e.preventDefault();
    props.onChange(!props.value, props.id);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    e.stopPropagation();
    props.onChange(!props.value, props.id);
  };

  const onInputFocus = () => {
    if (props.disabled) return;
    toggleFocused();
    props.onFocus?.call(null, props.id);
  };

  const onInputBlur = () => {
    if (props.disabled) return;
    toggleFocused();
    props.onBlur?.call(null, props.id);
  };

  return (
    <label
      htmlFor={props.id}
      className="control-checkbox"
      onClick={onLabelClick}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      onMouseEnter={() => toggleHovered()}
      onMouseLeave={() => toggleHovered()}
    >
      <HiddenInput
        type="checkbox"
        id={props.id}
        name={props.id}
        value={Converter.Boolean.ToBooleanString(props.value)}
        checked={props.value}
        disabled={props.disabled}
        onChange={onInputChange}
      />
      <div className="control-checkbox__choice">
        <Choice
          type="checkbox"
          state={props.state}
          checked={props.value}
          focused={focused}
          hovered={hovered}
          disabled={props.disabled}
        />
      </div>
      <div className="control-checkbox__content">{props.children}</div>
    </label>
  );
};
