import {
  useCallback,
  useRef,
  type HTMLInputTypeAttribute,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import type { Interactive } from '@controls/utils/types';
import { useControlInteraction } from '@controls/hooks';
import {
  applyMask,
  getFirstNotEnteredCharIndex,
  getNextChar,
  getPreviousChar,
  isDigit,
  isSeparator,
  replaceCharByIndex,
  setCursorPosition,
} from '@controls/control-input/control-input.utils';
import type { Base } from '@utils/types';
import cn from '@controls/control-input/control-input.module.css';
import { baseProps } from '@utils/functions';

export interface ControlInputProps extends Base, Interactive<string> {
  type?: HTMLInputTypeAttribute;
  masked?: boolean;
  mask?: string;
  maxLength?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}

export const ControlInput = ({
  id,
  value = '',
  disabled = false,
  masked = false,
  mask = 'DD/MM/YYYY',
  maxLength,
  type = 'text',
  onAutofill,
  onAutofillCancel,
  onChange,
  onFocus,
  onBlur,
  ...base
}: ControlInputProps) => {
  const { emitChange, handleFocus, handleBlur } = useControlInteraction<string>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const isInternalUpdate = useRef(false);
  const [inputValue, setInputValue] = useState<string>(value || mask);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      if (!inputRef.current) return;

      const firstNotEnteredCharIndex = getFirstNotEnteredCharIndex(inputValue, mask);
      const isCompleted = firstNotEnteredCharIndex === inputValue.length;
      const newChar = e.target.value.slice(firstNotEnteredCharIndex, firstNotEnteredCharIndex + 1);

      if (isDigit(newChar)) {
        const newInputValue = replaceCharByIndex(inputValue, firstNotEnteredCharIndex, newChar);
        const cursor = getFirstNotEnteredCharIndex(newInputValue, mask);

        if (isCompleted) {
          const currentCursor = inputRef.current.selectionEnd || 0;
          const before = e.target.value.slice(0, currentCursor - 1);
          const char = e.target.value.slice(currentCursor - 1, currentCursor);
          const after = e.target.value.slice(currentCursor);
          const updatedInputValue = replaceCharByIndex(before + after, currentCursor - 1, char);
          const nextChar = getNextChar(before + after, currentCursor) || '';
          setInputValue(updatedInputValue);
          setCursorPosition(inputRef, isSeparator(nextChar, mask) && nextChar ? currentCursor + 1 : currentCursor);
        } else {
          setInputValue(newInputValue);
          setCursorPosition(inputRef, cursor);
        }
        isInternalUpdate.current = true;
        return;
      }

      if (isSeparator(newChar, mask)) {
        const cursor = getFirstNotEnteredCharIndex(inputValue, mask) - 1;
        const newChar = e.target.value.slice(cursor, cursor + 1);
        if (isDigit(newChar)) {
          setInputValue(replaceCharByIndex(inputValue, cursor + 1, newChar));
          setCursorPosition(inputRef, cursor + 2);
        } else {
          setCursorPosition(inputRef, firstNotEnteredCharIndex - 1);
        }
        isInternalUpdate.current = true;
        return;
      }

      setCursorPosition(inputRef, firstNotEnteredCharIndex);
    },
    [inputValue, mask],
  );

  const handleKeyStroke = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (inputRef.current && e.code === 'Backspace') {
        e.preventDefault();
        const cursor = inputRef.current.selectionEnd || 0;
        if (cursor) {
          const newCursor = cursor - (isSeparator(getPreviousChar(inputValue, cursor), mask) ? 2 : 1);
          const newInputValue = applyMask(inputValue, mask, cursor - 1);
          setInputValue(newInputValue);
          setCursorPosition(inputRef, newCursor);
          isInternalUpdate.current = true;
        }
      }
    },
    [inputValue, mask],
  );

  const handleInputClick = useCallback(
    (e: MouseEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const cursor = getFirstNotEnteredCharIndex(inputValue, mask);
      if (cursor !== inputValue.length) setCursorPosition(inputRef, cursor);
    },
    [inputValue, mask],
  );

  const handleInputFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const cursor = getFirstNotEnteredCharIndex(inputValue, mask);
      if (cursor !== inputValue.length) setCursorPosition(inputRef, cursor);
      handleFocus();
    },
    [inputValue, mask, handleFocus],
  );

  const handleInputBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>): void => {
      e.preventDefault();
      handleBlur();
    },
    [handleBlur],
  );

  useEffect(() => {
    if (!isInternalUpdate.current) {
      setInputValue(value || mask);
    }
    isInternalUpdate.current = false;
  }, [value, mask]);

  useEffect(() => {
    if (isInternalUpdate.current) {
      emitChange(inputValue !== mask ? inputValue : '', 'keyboard');
    }
  }, [inputValue, mask]);

  return masked ? (
    <input
      ref={inputRef}
      data-testid={baseProps(base, 'data-testid', 'input')}
      disabled={disabled}
      type="text"
      id={id}
      name={id}
      value={inputValue}
      className={clsx(cn.ControlInput, baseProps(base, 'className'), { [cn.Placeholder]: inputValue === mask })}
      onKeyDown={handleKeyStroke}
      onChange={handleInputChange}
      onClick={handleInputClick}
      onDoubleClick={handleInputClick}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  ) : (
    <input
      data-testid={baseProps(base, 'data-testid', 'input')}
      disabled={disabled}
      maxLength={maxLength}
      type={type}
      id={id}
      name={id}
      value={value}
      className={clsx(cn.ControlInput, baseProps(base, 'className'))}
      onChange={(e) => emitChange(e.target.value, 'keyboard')}
      onAnimationStart={(e) => {
        if (e.animationName === cn['autofill-start']) onAutofill?.call(null, id);
        if (e.animationName === cn['autofill-cancel']) {
          e.currentTarget.blur();
          onAutofillCancel?.call(null, id);
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
