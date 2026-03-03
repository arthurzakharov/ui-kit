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
  value = '',
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

  const [localValue, setLocalValue] = useState(value || mask);

  const getMaskedDisplayValue = (val: string): string => {
    if (!val) return mask;

    let result = '';
    for (let i = 0; i < mask.length; i++) {
      if (i < val.length && val[i] !== mask[i] && val[i] !== ' ') {
        result += val[i];
      } else {
        result += mask[i];
      }
    }
    return result;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current || disabled) return;

    const inputValue = e.target.value;
    const oldValue = localValue;

    // Find the position where the change occurred
    let changedIndex = -1;
    for (let i = 0; i < mask.length; i++) {
      if (inputValue[i] !== oldValue[i]) {
        changedIndex = i;
        break;
      }
    }

    if (changedIndex === -1) return;

    const newChar = inputValue[changedIndex];

    // Handle backspace/delete (empty character)
    if (!newChar || newChar === ' ') {
      const newValue = applyMask(oldValue, mask, changedIndex);
      setLocalValue(newValue);
      emitChange(newValue.replace(/[^0-9]/g, ''), 'keyboard');
      setCursorPosition(inputRef, changedIndex);
      return;
    }

    // Handle digit input
    if (isDigit(newChar)) {
      // Skip separators
      let targetIndex = changedIndex;
      while (targetIndex < mask.length && isSeparator(mask[targetIndex], mask)) {
        targetIndex++;
      }

      if (targetIndex < mask.length) {
        const newValue = replaceCharByIndex(oldValue, targetIndex, newChar);
        setLocalValue(newValue);

        // Calculate next position
        let nextPos = targetIndex + 1;
        while (nextPos < mask.length && isSeparator(mask[nextPos], mask)) {
          nextPos++;
        }

        emitChange(newValue.replace(/[^0-9]/g, ''), 'keyboard');
        setCursorPosition(inputRef, nextPos);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current || disabled) return;

    const cursor = inputRef.current.selectionStart || 0;

    if (e.key === 'Backspace') {
      e.preventDefault();

      // Find previous editable position
      let prevPos = cursor - 1;
      while (prevPos >= 0 && isSeparator(mask[prevPos], mask)) {
        prevPos--;
      }

      if (prevPos >= 0) {
        const newValue = applyMask(localValue, mask, prevPos);
        setLocalValue(newValue);
        emitChange(newValue.replace(/[^0-9]/g, ''), 'keyboard');
        setCursorPosition(inputRef, prevPos);
      }
    }

    if (e.key === 'Delete') {
      e.preventDefault();

      // Find next editable position
      let nextPos = cursor;
      while (nextPos < mask.length && isSeparator(mask[nextPos], mask)) {
        nextPos++;
      }

      if (nextPos < mask.length) {
        const newValue = applyMask(localValue, mask, nextPos);
        setLocalValue(newValue);
        emitChange(newValue.replace(/[^0-9]/g, ''), 'keyboard');
        setCursorPosition(inputRef, cursor);
      }
    }
  };

  const handleInputClick = () => {
    if (!inputRef.current || disabled) return;

    // Find first empty position
    const cursor = inputRef.current.selectionStart || 0;
    let targetPos = cursor;

    // If clicked on separator, move to next editable position
    if (isSeparator(mask[cursor], mask)) {
      targetPos = cursor + 1;
      while (targetPos < mask.length && isSeparator(mask[targetPos], mask)) {
        targetPos++;
      }
    }

    setCursorPosition(inputRef, targetPos);
  };

  const handleInputFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>): void => {
      if (disabled) return;

      // Find first empty position
      const firstEmptyIndex = getFirstNotEnteredCharIndex(localValue, mask);
      if (firstEmptyIndex < mask.length) {
        setCursorPosition(inputRef, firstEmptyIndex);
      }

      handleFocus();
    },
    [localValue, disabled, handleFocus],
  );

  const handleInputBlur = useCallback(
    (_e: FocusEvent<HTMLInputElement>): void => {
      handleBlur();
    },
    [handleBlur],
  );

  // Update local value when prop value changes
  useEffect(() => {
    if (dateMask) {
      if (value) {
        // Build masked value from raw value
        let newValue = '';
        let valueIndex = 0;
        for (let i = 0; i < mask.length; i++) {
          if (isSeparator(mask[i], mask)) {
            newValue += mask[i];
          } else if (valueIndex < value.length) {
            newValue += value[valueIndex];
            valueIndex++;
          } else {
            newValue += mask[i];
          }
        }
        setLocalValue(newValue);
      } else {
        setLocalValue(mask);
      }
    }
  }, [value, dateMask]);

  const displayValue = dateMask ? getMaskedDisplayValue(localValue) : value;

  return dateMask ? (
    <input
      ref={inputRef}
      data-testid={baseProps(base, 'data-testid', 'input')}
      disabled={disabled}
      maxLength={mask.length}
      type="text"
      id={id}
      name={id}
      value={displayValue}
      className={clsx(cn.ControlInput, baseProps(base, 'className'), displayValue === mask && cn.Placeholder)}
      onKeyDown={handleKeyDown}
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
