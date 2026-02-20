import type { ChangeEvent, MouseEvent, PropsWithChildren } from 'react';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import type { Interactive, State } from '@controls/utils/types';
import { ControlChoice, type ControlChoiceProps } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { Converter } from '@utils/converter/converter.util';
import cn from '@controls/control-checkbox/control-checkbox.module.css';

export interface ControlCheckboxProps extends PropsWithChildren, Interactive<boolean> {
  state?: State;
  icon?: ControlChoiceProps['size'];
  text?: 'body' | 'body-small';
}

export const ControlCheckbox = (props: ControlCheckboxProps) => {
  const {
    children,
    state = 'idle',
    icon = 'md',
    text = 'body-small',
    id,
    value,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
  } = props;

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
      <ControlHiddenInput
        type="checkbox"
        id={id}
        name={id}
        value={Converter.Boolean.ToBooleanString(value)}
        checked={value}
        disabled={disabled}
        onChange={onInputChange}
      />
      <div className={cn.CheckboxChoice}>
        <ControlChoice
          type="checkbox"
          size={icon}
          state={state}
          checked={value}
          focused={focused}
          hovered={hovered}
          disabled={disabled}
        />
      </div>
      <div
        className={clsx(cn.CheckboxContent, {
          [cn.CheckboxContentTextBody]: text === 'body',
          [cn.CheckboxContentTextBodySmall]: text === 'body-small',
        })}
      >
        {children}
      </div>
    </label>
  );
};
