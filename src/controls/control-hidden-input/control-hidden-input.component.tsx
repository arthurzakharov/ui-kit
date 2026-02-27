import type { ChangeEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import type { InputChangeSource } from '@controls/utils/types';
import type { Base } from '@utils/types';
import cn from '@controls/control-hidden-input/control-hidden-input.module.css';

export interface ControlHiddenInputProps extends Base {
  id: string;
  value: string;
  name: string;
  type: 'radio' | 'checkbox';
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, source?: InputChangeSource) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const ControlHiddenInput = (props: ControlHiddenInputProps) => {
  const {
    type,
    id,
    name,
    value,
    disabled = false,
    checked,
    onChange,
    onFocus = () => {},
    onBlur = () => {},
    className,
  } = props;

  return (
    <input
      data-testid="hidden-input"
      type={type}
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      className={clsx(cn.ControlHiddenInput, className)}
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
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
