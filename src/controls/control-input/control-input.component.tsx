import {
  useCallback,
  useRef,
  type HTMLInputTypeAttribute,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
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
  preventSelection,
  replaceCharByIndex,
  setCursorPosition,
} from '@controls/control-input/control-input.utils';
import type { Base } from '@utils/types';
import cn from '@controls/control-input/control-input.module.css';
import { baseProps } from '@utils/functions';

export interface ControlInputProps extends Base, Interactive<string> {
  type?: HTMLInputTypeAttribute;
  dateMask?: boolean;
  maxLength?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}

const mask = 'TT/MM/JJJJ';

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
  ...base
}: ControlInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { emitChange, handleFocus, handleBlur } = useControlInteraction<string>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  const isInternalUpdate = useRef(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      if (!inputRef.current) return;

      const firstNotEnteredCharIndex = getFirstNotEnteredCharIndex(value, mask);
      const isCompleted = firstNotEnteredCharIndex === value.length;
      const newChar = e.target.value.slice(firstNotEnteredCharIndex, firstNotEnteredCharIndex + 1);

      if (isDigit(newChar)) {
        const newInputValue = replaceCharByIndex(value, firstNotEnteredCharIndex, newChar);
        const cursor = getFirstNotEnteredCharIndex(newInputValue, mask);

        if (isCompleted) {
          const currentCursor = inputRef.current.selectionEnd || 0;
          const before = e.target.value.slice(0, currentCursor - 1);
          const char = e.target.value.slice(currentCursor - 1, currentCursor);
          const after = e.target.value.slice(currentCursor);
          const updatedInputValue = replaceCharByIndex(before + after, currentCursor - 1, char);
          const nextChar = getNextChar(before + after, currentCursor) || '';
          emitChange(updatedInputValue, 'keyboard');
          setCursorPosition(inputRef, isSeparator(nextChar, mask) && nextChar ? currentCursor + 1 : currentCursor);
        } else {
          emitChange(newInputValue, 'keyboard');
          setCursorPosition(inputRef, cursor);
        }
        isInternalUpdate.current = true;
        return;
      }

      if (isSeparator(newChar, mask)) {
        const cursor = getFirstNotEnteredCharIndex(value, mask) - 1;
        const newChar = e.target.value.slice(cursor, cursor + 1);
        if (isDigit(newChar)) {
          emitChange(replaceCharByIndex(value, cursor + 1, newChar), 'keyboard');
          setCursorPosition(inputRef, cursor + 2);
        } else {
          setCursorPosition(inputRef, firstNotEnteredCharIndex - 1);
        }
        isInternalUpdate.current = true;
        return;
      }

      setCursorPosition(inputRef, firstNotEnteredCharIndex);
    },
    [value, mask],
  );

  const handleKeyStroke = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (inputRef.current && e.code === 'Backspace') {
        e.preventDefault();
        const cursor = inputRef.current.selectionEnd || 0;
        if (cursor) {
          const newCursor = cursor - (isSeparator(getPreviousChar(value, cursor), mask) ? 2 : 1);
          const newInputValue = applyMask(value, mask, cursor - 1);
          emitChange(newInputValue, 'keyboard');
          setCursorPosition(inputRef, newCursor);
          isInternalUpdate.current = true;
        }
      }
    },
    [value, mask],
  );

  const handleInputClick = useCallback(
    (e: MouseEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const cursor = getFirstNotEnteredCharIndex(value, mask);
      if (cursor !== value.length) setCursorPosition(inputRef, cursor);
    },
    [value, mask],
  );

  const handleInputFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>): void => {
      e.preventDefault();
      preventSelection(inputRef);
      const cursor = getFirstNotEnteredCharIndex(value, mask);
      if (cursor !== value.length) setCursorPosition(inputRef, cursor);
      handleFocus();
    },
    [value, mask],
  );

  const handleInputBlur = useCallback((e: FocusEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleBlur();
  }, []);

  useEffect(() => {
    if (!dateMask) return;
    if (!isInternalUpdate.current) {
      emitChange(value || mask, 'keyboard');
    }
    isInternalUpdate.current = false;
  }, [value]);

  useEffect(() => {
    if (!dateMask) return;
    if (isInternalUpdate.current) {
      emitChange(value !== mask ? value : '', 'keyboard');
    }
  }, [value, id]);

  return dateMask ? (
    <input
      ref={inputRef}
      data-testid={baseProps(base, 'data-testid', 'input')}
      disabled={disabled}
      maxLength={mask.length}
      type="text"
      id={id}
      name={id}
      value={value}
      className={clsx(cn.ControlInput, baseProps(base, 'className'), value === mask && cn.Placeholder)}
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
