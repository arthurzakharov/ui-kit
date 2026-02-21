import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';
import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import type { State } from '@controls/utils/types';
import { ControlBox } from '@controls/control-box';
import { ControlInput, type ControlInputProps } from '@controls/control-input';
import { ControlLabel } from '@controls/control-label';
import type { Base } from '@utils/types';
import cn from '@controls/control-text/control-text.module.css';

export type ControlTextProps = {
  label: string;
  message?: string;
  placeholder?: string;
  state?: State;
} & ControlInputProps &
  Base;

export const ControlText = (props: ControlTextProps) => {
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
    <div className={clsx(cn.Text, className)}>
      <ControlBox state={state} focused={focused}>
        <label htmlFor={id} className={cn.TextContent}>
          <div className={clsx(cn.TextLabel, isLabelActive ? cn.TextLabelActive : cn.TextLabelIdle)}>
            <ControlLabel position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : state}>
              {label}
            </ControlLabel>
          </div>
          <AnimationFadeScale name="text-placeholder" condition={withPlaceholder} className={cn.TextPlaceholder}>
            <span className={cn.TextPlaceholderText}>{placeholder}</span>
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
      <AnimationFadeSlide flex name="text-message" condition={withErrorMessage}>
        <span className={cn.TextErrorMessage}>{message}</span>
      </AnimationFadeSlide>
    </div>
  );
};
