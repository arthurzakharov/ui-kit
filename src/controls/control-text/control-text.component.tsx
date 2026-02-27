import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import type { State } from '@controls/utils/types';
import { ControlBox } from '@controls/control-box';
import { ControlInput, type ControlInputProps } from '@controls/control-input';
import { ControlLabel } from '@controls/control-label';
import { ControlErrorMessage } from '@controls/control-error-message';
import type { Base } from '@utils/types';
import cn from '@controls/control-text/control-text.module.css';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';

export interface ControlTextProps extends Base, ControlInputProps {
  label: string;
  message?: ReactNode;
  placeholder?: string;
  state?: State;
}

export const ControlText = (props: ControlTextProps) => {
  const {
    label,
    message = '',
    placeholder = '',
    dateMask = false,
    maxLength,
    state = 'idle',
    type = 'text',
    id,
    value,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    className,
  } = props;
  const { value: isIdle, setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const { value: isInAutofillState, setTrue: markAutofillState, setFalse: unmarkAutofillState } = useBoolean(true);
  const [focused, toggleFocused] = useToggle();

  const isLabelActive = !isIdle || !!value;
  const withPlaceholder = !!placeholder && !isIdle && !value && !isInAutofillState;
  const withErrorMessage = !!message && state === 'error';

  const onAutofill = (): void => {
    markAutofillState();
    makeActive();
  };

  const onAutofillCancel = (): void => {
    if (value) return;
    unmarkAutofillState();
    makeIdle();
  };

  const onInputFocus = (id: string): void => {
    if (!value) makeActive();
    toggleFocused();
    onFocus?.call(null, id);
  };

  const onInputBlur = (id: string): void => {
    if (!value) makeIdle();
    toggleFocused();
    onBlur?.call(null, id);
  };

  return (
    <div className={clsx(cn.ControlText, className)}>
      <ControlBox state={state} focused={focused}>
        <label htmlFor={id} className={cn.Content}>
          <div className={clsx(cn.Label, isLabelActive ? cn.LabelActive : cn.LabelIdle)}>
            <ControlLabel position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : state}>
              {label}
            </ControlLabel>
          </div>
          <AnimationFadeScale name="text-placeholder" condition={withPlaceholder} className={cn.Placeholder}>
            <span className={cn.PlaceholderText}>{placeholder}</span>
          </AnimationFadeScale>
          <ControlInput
            dateMask={dateMask}
            maxLength={maxLength}
            disabled={disabled}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onAutofill={onAutofill}
            onAutofillCancel={onAutofillCancel}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </label>
      </ControlBox>
      <AnimationFadeSlide name="text-message" condition={withErrorMessage}>
        <ControlErrorMessage className={cn.ErrorMessage}>{message}</ControlErrorMessage>
      </AnimationFadeSlide>
    </div>
  );
};
