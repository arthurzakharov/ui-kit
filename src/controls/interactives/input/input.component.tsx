import { type KeyboardEvent, useCallback, useState, useRef, useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import {
  applyMask,
  compareStrings,
  getFirstNotEnteredCharIndex,
  getNextChar,
  getPreviousChar,
  isDigit,
  isSeparator,
  replaceCharByIndex,
} from '@controls/interactives/input/input.utils';
import { useControlInteraction, type Interactive } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/interactives/input/input.module.css';

export interface InputProps extends Base, Interactive<string> {
  mask?: string;
  maxLength?: number;
  onAnimationStart?: (id: string) => void;
  onAnimationEnd?: (id: string) => void;
}

export const Input = ({
  // Interactive props
  id,
  value = '',
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  // Input props
  maxLength,
  mask = '',
  onAnimationStart,
  onAnimationEnd,
  // Base props
  ...base
}: InputProps) => {
  const { emitChange, handleFocus, handleBlur } = useControlInteraction({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const skipFocusCursorUpdate = useRef(false);
  const pendingCursorPosition = useRef<number | null>(null);
  const isFirstMaskedEffect = useRef(true);
  const [inputValue, setInputValue] = useState(value || mask);

  const updateCursorPosition = (position: number) => {
    const nextPosition = Math.max(0, position);
    pendingCursorPosition.current = nextPosition;

    if (!inputRef.current) return;
    const safePosition = Math.min(nextPosition, inputRef.current.value.length);
    inputRef.current.setSelectionRange(safePosition, safePosition);
  };

  useLayoutEffect(() => {
    if (!mask) return;
    if (!inputRef.current || pendingCursorPosition.current === null) return;

    const safePosition = Math.min(pendingCursorPosition.current, inputRef.current.value.length);
    inputRef.current.setSelectionRange(safePosition, safePosition);
    pendingCursorPosition.current = null;
  }, [inputValue, mask]);

  const putCursorToFirstEmptySlot = () => {
    const currentValue = inputRef.current?.value || '';
    const newCursor = getFirstNotEnteredCharIndex(currentValue, mask);
    if (newCursor !== currentValue.length) {
      updateCursorPosition(newCursor);
    }
  };

  const handleDateChange = useCallback(() => {
    const currentValue = inputRef.current?.value || '';
    const newChar = compareStrings(inputValue, currentValue);

    if (!isDigit(newChar)) return;

    const currentCursor = inputRef.current?.selectionEnd || 0;
    const firstNotEnteredCharIndex = getFirstNotEnteredCharIndex(currentValue, mask);
    const isCompleted = firstNotEnteredCharIndex === currentValue.length;
    const newInputValue = replaceCharByIndex(inputValue, currentCursor - 1, newChar);
    const cursor = getFirstNotEnteredCharIndex(newInputValue, mask);

    if (isCompleted) {
      const before = currentValue.slice(0, currentCursor - 1);
      const char = currentValue.slice(currentCursor - 1, currentCursor);
      const after = currentValue.slice(currentCursor);
      const updatedInputValue = replaceCharByIndex(before + after, currentCursor - 1, char);
      const nextChar = getNextChar(before + after, currentCursor) || '';
      setInputValue(updatedInputValue);
      updateCursorPosition(isSeparator(nextChar, mask) && nextChar ? currentCursor + 1 : currentCursor);
    } else {
      setInputValue(newInputValue);
      updateCursorPosition(cursor);
    }
  }, [inputValue, mask]);

  const handleDateKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Digit0',
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];
      if (!allowedKeys.includes(e.code)) e.preventDefault();
      if (e.code === 'Backspace') {
        e.preventDefault();
        const cursor = inputRef.current?.selectionEnd || 0;
        if (cursor) {
          const previousChar = getPreviousChar(inputValue, cursor);
          const currentChar = getNextChar(inputValue, cursor - 1);
          const isPreviousSeparator = isSeparator(previousChar, mask);
          const isCurrentSeparator = isSeparator(currentChar, mask);
          const newCursor = cursor - (isPreviousSeparator || isCurrentSeparator ? 2 : 1);
          const newInputValue = applyMask(inputValue, mask, cursor - (isCurrentSeparator ? 2 : 1));
          setInputValue(newInputValue);

          updateCursorPosition(newCursor);
        }
      }
    },
    [inputValue, mask],
  );

  useEffect(() => {
    if (!mask) return;

    if (isFirstMaskedEffect.current) {
      isFirstMaskedEffect.current = false;
      return;
    }

    emitChange(inputValue !== mask ? inputValue : '', 'keyboard');
  }, [inputValue, mask, emitChange]);

  const handleAutofillAnimation = (animationName: string) => {
    if (animationName.includes('autofill-start')) onAnimationStart?.(id);
    if (animationName.includes('autofill-end')) onAnimationEnd?.(id);
  };

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
      className={clsx(cn.Input, baseProps(base, 'className'), { [cn.Placeholder]: inputValue === mask })}
      onAnimationStart={(e) => handleAutofillAnimation(e.animationName)}
      onKeyDown={handleDateKeyDown}
      onChange={handleDateChange}
      onPointerDown={(e) => {
        e.preventDefault();
        skipFocusCursorUpdate.current = true;
        e.currentTarget.focus();
        putCursorToFirstEmptySlot();
      }}
      onFocus={() => {
        handleFocus();
        if (skipFocusCursorUpdate.current) {
          skipFocusCursorUpdate.current = false;
          return;
        }
        putCursorToFirstEmptySlot();
      }}
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
      className={clsx(cn.Input, baseProps(base, 'className'))}
      onChange={(e) => emitChange(e.target.value, 'keyboard')}
      onAnimationStart={(e) => handleAutofillAnimation(e.animationName)}
      onFocus={handleFocus}
      onBlur={() => handleBlur()}
    />
  );
};
