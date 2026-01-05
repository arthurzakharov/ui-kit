import type { ChangeEvent } from 'react';
import type { HiddenInputProps } from './hidden-input.types';
import './hidden-input.css';

export const HiddenInput = ({ type, id, name, value, disabled, checked, onChange }: HiddenInputProps) => (
  <input
    type={type}
    id={id}
    name={name}
    value={value}
    checked={checked}
    disabled={disabled}
    className="control-hidden-input"
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
