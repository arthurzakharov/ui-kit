import type { ChangeEvent } from 'react';
import type { HiddenInputProps } from '@/components/control/components/hidden-input/hidden-input.types';
import cn from '@/components/control/components/hidden-input/hidden-input.module.css';

export const HiddenInput = ({ type, id, name, value, disabled = false, checked, onChange }: HiddenInputProps) => (
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
