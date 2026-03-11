import type { ChangeEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import type { ControlChoiceType, InputChangeSource } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/hidden-input/hidden-input.module.css';

export interface HiddenInputProps extends Base {
  id: string;
  value: string;
  name: string;
  type: ControlChoiceType;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, source: InputChangeSource) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const HiddenInput = ({
  type,
  id,
  name,
  value,
  disabled,
  checked,
  onChange,
  onFocus,
  onBlur,
  // Base props
  ...base
}: HiddenInputProps) => (
  <input
    data-testid={baseProps(base, 'data-testid', 'hidden-input')}
    type={type}
    id={id}
    name={name}
    value={value}
    checked={checked}
    disabled={disabled}
    className={clsx(cn.HiddenInput, baseProps(base, 'className'))}
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
    onFocus={onFocus}
    onBlur={onBlur}
  />
);
