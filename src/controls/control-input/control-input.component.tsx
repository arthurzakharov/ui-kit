import { type HTMLInputTypeAttribute, type MouseEvent, type KeyboardEvent, useRef } from 'react';
import InputMask, { type ReactInputMask } from 'react-input-mask';
import type { Interactive } from '@controls/utils/types';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import { findEndIndex } from '@controls/utils/functions';
import cn from '@controls/control-input/control-input.module.css';

type RefMask = ReactInputMask & HTMLInputElement;

export interface ControlInputProps extends Base, Interactive<string> {
  type?: HTMLInputTypeAttribute;
  dateMask?: boolean;
  maxLength?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}

export const ControlInput = ({
  id,
  value,
  disabled = false,
  dateMask = false,
  maxLength,
  type = 'text',
  onAutofill,
  onAutofillCancel,
  onChange,
  onFocus,
  onBlur,
  className,
}: ControlInputProps) => {
  const ref = useRef<RefMask>(null);

  const onDateClick = (e: MouseEvent<HTMLInputElement>): void => {
    const caretPosition = findEndIndex(value);
    if (caretPosition < value.length - 1 && ref.current) {
      e.preventDefault();
      ref.current.setSelectionRange(caretPosition + 1, caretPosition + 1, 'none');
    }
  };

  const onDateKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault();
    }
    if (e.code === 'ArrowRight' && ref.current) {
      const start = ref.current.selectionStart || 0;
      const nextChar = value[start + 1] === '/' ? value[start + 2] : value[start + 1];
      if (!/^\d+$/.test(nextChar)) {
        e.preventDefault();
      } else {
        const correction = value[start + 1] === '/' ? 1 : 0;
        ref.current.setSelectionRange(start + correction, start + correction, 'none');
      }
    }
    if (e.code === 'ArrowLeft' && ref.current) {
      e.preventDefault();
      const start = ref.current.selectionStart || 0;
      const prevChar = value[start - 1] === '/' ? value[start - 2] : value[start - 1];
      if (!/^\d+$/.test(prevChar)) {
        e.preventDefault();
      } else {
        const correction = value[start - 1] === '/' ? 2 : 1;
        ref.current.setSelectionRange(start - correction, start - correction, 'none');
      }
    }
  };

  return dateMask ? (
    <InputMask
      data-testid="input-masked"
      ref={ref}
      value={value}
      id={id}
      className={clsx(cn.ControlInput, className)}
      disabled={disabled}
      mask="99/99/9999"
      maskChar="_"
      alwaysShowMask={false}
      onClick={onDateClick}
      onKeyDown={onDateKeyDown}
      onChange={(e) => onChange(e.target.value, id, 'keyboard')}
      onAnimationStart={(e) => {
        if (e.animationName === cn['autofill-start']) onAutofill?.call(null, id);
        if (e.animationName === cn['autofill-cancel']) {
          e.currentTarget.blur();
          onAutofillCancel?.call(null, id);
        }
      }}
      onFocus={() => onFocus?.call(null, id)}
      onBlur={() => onBlur?.call(null, id)}
    />
  ) : (
    <input
      data-testid="input"
      disabled={disabled}
      maxLength={maxLength}
      type={type}
      id={id}
      name={id}
      value={value}
      className={clsx(cn.ControlInput, className)}
      onChange={(e) => onChange(e.target.value, id, 'keyboard')}
      onAnimationStart={(e) => {
        if (e.animationName === cn['autofill-start']) onAutofill?.call(null, id);
        if (e.animationName === cn['autofill-cancel']) {
          e.currentTarget.blur();
          onAutofillCancel?.call(null, id);
        }
      }}
      onFocus={() => onFocus?.call(null, id)}
      onBlur={() => onBlur?.call(null, id)}
    />
  );
};
