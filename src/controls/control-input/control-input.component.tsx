import { type ChangeEvent, type KeyboardEvent, useCallback, useEffect, useState, useRef } from 'react';
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
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-input/control-input.module.css';

export interface ControlInputProps extends Interactive<string>, Base {
  mask?: string;
  maxLength?: number;
  onAnimationStart?: (id: string) => void;
}

export const ControlInput = ({
  // Interactive props
  id,
  value = '',
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  // ControlInput specific props
  maxLength,
  mask = '',
  onAnimationStart,
  // Base props
  ...base
}: ControlInputProps) => {
  const { emitChange, handleFocus, handleBlur } = useControlInteraction({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const isInternalUpdate = useRef(false);
  const [inputValue, setInputValue] = useState<string>(value || mask);

  const handleDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Keep masked input fully controlled.
      if (!inputRef.current) return;

      // Find the first editable slot in the mask.
      const firstNotEnteredCharIndex = getFirstNotEnteredCharIndex(inputValue, mask);
      const isCompleted = firstNotEnteredCharIndex === inputValue.length;
      const newChar = e.target.value.slice(firstNotEnteredCharIndex, firstNotEnteredCharIndex + 1);

      if (isDigit(newChar)) {
        // Insert typed digit into the next mask slot.
        const newInputValue = replaceCharByIndex(inputValue, firstNotEnteredCharIndex, newChar);
        const cursor = getFirstNotEnteredCharIndex(newInputValue, mask);

        if (isCompleted) {
          // If full, replace at current cursor position.
          const currentCursor = inputRef.current.selectionEnd || 0;
          const before = e.target.value.slice(0, currentCursor - 1);
          const char = e.target.value.slice(currentCursor - 1, currentCursor);
          const after = e.target.value.slice(currentCursor);
          const updatedInputValue = replaceCharByIndex(before + after, currentCursor - 1, char);
          const nextChar = getNextChar(before + after, currentCursor) || '';
          setInputValue(updatedInputValue);
          // Skip over separators when moving the caret.
          setCursorPosition(inputRef, isSeparator(nextChar, mask) && nextChar ? currentCursor + 1 : currentCursor);
        } else {
          setInputValue(newInputValue);
          setCursorPosition(inputRef, cursor);
        }
        // Mark as internal to trigger controlled emit flow.
        isInternalUpdate.current = true;
        return;
      }

      if (isSeparator(newChar, mask)) {
        // Handle typing near a separator boundary.
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

      // Reject invalid input and restore caret.
      setCursorPosition(inputRef, firstNotEnteredCharIndex);
    },
    [inputValue, mask],
  );

  const handleDateKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (inputRef.current && e.code === 'Backspace') {
        // Handle Backspace manually for masked input.
        e.preventDefault();
        const cursor = inputRef.current.selectionEnd || 0;
        if (cursor) {
          // Move over separator and previous digit when needed.
          const newCursor = cursor - (isSeparator(getPreviousChar(inputValue, cursor), mask) ? 2 : 1);
          // Restore deleted position to its mask placeholder.
          const newInputValue = applyMask(inputValue, mask, cursor - 1);
          setInputValue(newInputValue);
          // Reset caret after controlled value update.
          setCursorPosition(inputRef, newCursor);
          // Mark as internal to keep effect flow consistent.
          isInternalUpdate.current = true;
        }
      }
    },
    [inputValue, mask],
  );

  const handleDateFocus = useCallback(() => {
    handleFocus();
    // If date is not complete, set cursor to the first not entered character
    const cursor = getFirstNotEnteredCharIndex(inputValue, mask);
    if (cursor !== inputValue.length) setCursorPosition(inputRef, cursor);
  }, [inputValue, mask, handleFocus]);

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

  return mask ? (
    <input
      ref={inputRef}
      data-testid={baseProps(base, 'data-testid', 'input')}
      aria-label={`${id}-date-input`}
      disabled={disabled}
      type="text"
      id={id}
      name={id}
      value={inputValue}
      className={clsx(cn.ControlInput, baseProps(base, 'className'), { [cn.Placeholder]: inputValue === mask })}
      onKeyDown={handleDateKeyDown}
      onChange={handleDateChange}
      onAnimationStart={(e) => onAnimationStart?.(e.currentTarget.id)}
      onFocus={handleDateFocus}
      onBlur={() => handleBlur()}
    />
  ) : (
    <input
      data-testid={baseProps(base, 'data-testid', 'input')}
      aria-label={`${id}-text-input`}
      disabled={disabled}
      maxLength={maxLength}
      type="text"
      id={id}
      name={id}
      value={value}
      className={clsx(cn.ControlInput, baseProps(base, 'className'))}
      onChange={(e) => emitChange(e.target.value, 'keyboard')}
      onAnimationStart={(e) => onAnimationStart?.(e.currentTarget.id)}
      onFocus={handleFocus}
      onBlur={() => handleBlur()}
    />
  );
};
