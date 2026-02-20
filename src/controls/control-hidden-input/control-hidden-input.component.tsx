import type { ChangeEvent } from 'react';
import type { InputChangeSource } from '@controls/utils/types';
import cn from '@controls/control-hidden-input/control-hidden-input.module.css';

export interface ControlHiddenInputProps {
  id: string;
  value: string;
  name: string;
  type: 'radio' | 'checkbox';
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, source?: InputChangeSource) => void;
}

export const ControlHiddenInput = (props: ControlHiddenInputProps) => {
  const { type, id, name, value, disabled = false, checked, onChange } = props;

  return (
    <input
      data-testid="hidden-input"
      type={type}
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      className={cn.HiddenInput}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (!!e.nativeEvent?.pageX || !!e.nativeEvent.pageY) {
          e.currentTarget.blur();
          onChange(e, 'mouse');
        } else {
          onChange(e, 'keyboard');
        }
      }}
    />
  );
};
