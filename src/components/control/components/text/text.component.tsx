import { Animation } from '@components/animation/animation.component';
import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import type { State } from '@components/control/control.types';
import { Control, type InputProps } from '@components/control/control.component';
import cn from '@components/control/components/text/text.module.css';

export interface TextProps extends InputProps {
  label: string;
  message?: string;
  placeholder?: string;
  state?: State;
}

export const Text = (props: TextProps) => {
  // TODO: onAutofill onAutofillCancel are passed but are not used anywhere
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
    <div className={cn.Text}>
      <Control.Box state={state} focused={focused}>
        <label htmlFor={id} className={cn.TextContent}>
          <div className={clsx(cn.TextLabel, isLabelActive ? cn.TextLabelActive : cn.TextLabelIdle)}>
            <Control.Label position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : state}>
              {label}
            </Control.Label>
          </div>
          <Animation.FadeScale name="text-placeholder" condition={withPlaceholder} className={cn.TextPlaceholder}>
            <span className={cn.TextPlaceholderText}>{placeholder}</span>
          </Animation.FadeScale>
          <Control.Input
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
      </Control.Box>
      <Animation.FadeSlide flex name="text-message" condition={withErrorMessage}>
        <span className={cn.TextErrorMessage}>{message}</span>
      </Animation.FadeSlide>
    </div>
  );
};
