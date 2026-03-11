import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import { FadeScale } from '@animations/fade-scale';
import { FadeSlide } from '@animations/fade-slide';
import { Box } from '@controls/box';
import { Input } from '@controls/input';
import { Label } from '@controls/label';
import { ErrorMessage } from '@controls/error-message';
import type { Interactive } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/text-field/text-field.module.css';

export interface TextFieldProps extends Base, Interactive<string> {
  mask?: string;
  maxLength?: number;
  label: string;
  message?: string;
  placeholder?: string;
}

export const TextField = ({
  // Interactive props
  id,
  value = '',
  disabled = false,
  state = 'idle',
  onChange,
  onFocus,
  onBlur,
  // Text props
  mask,
  maxLength = -1,
  label = '',
  message = '',
  placeholder = '',
  // Base props
  ...base
}: TextFieldProps) => {
  const { value: isInAutofillState, setTrue: markAutofillState, setFalse: unmarkAutofillState } = useBoolean(false);
  const { value: focused, setTrue: focusOn, setFalse: focusOff } = useBoolean(false);

  const isLabelActive = focused || !!value || isInAutofillState;
  const withPlaceholder = !mask && !!placeholder && focused && !value && !isInAutofillState;
  const withErrorMessage = !!message && state === 'error';

  const onInputFocus = (id: string) => {
    focusOn();
    onFocus?.(id);
  };

  const onInputBlur = (id: string) => {
    focusOff();
    onBlur?.(id);
  };

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'text-field')}
      className={clsx(cn.TextField, baseProps(base, 'className'))}
    >
      <Box state={state} focused={focused}>
        <label
          htmlFor={id}
          className={cn.Content}
          onPointerDown={(e) => {
            if (focused) e.preventDefault();
          }}
        >
          <Label
            data-testid="text-label"
            text={label}
            position={isLabelActive ? 'active' : 'idle'}
            state={isLabelActive ? state : 'idle'}
            className={clsx(cn.Label, isLabelActive ? cn.Active : cn.Idle)}
          />
          <FadeScale name="text-placeholder" condition={withPlaceholder} className={cn.Placeholder}>
            <span data-testid="text-placeholder" className={cn.PlaceholderText}>
              {placeholder}
            </span>
          </FadeScale>
          <Input
            data-testid="text-input"
            mask={mask}
            maxLength={maxLength}
            disabled={disabled}
            id={id}
            value={value}
            className={clsx(cn.Input, {
              [cn.MaskStart]: mask && value === '' && !isLabelActive,
            })}
            onAnimationStart={markAutofillState}
            onAnimationEnd={unmarkAutofillState}
            onChange={onChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </label>
      </Box>
      <FadeSlide name="text-message" direction="ltr" condition={withErrorMessage}>
        <ErrorMessage data-testid="text-error-message" text={message} className={cn.ErrorMessage} />
      </FadeSlide>
    </div>
  );
};
