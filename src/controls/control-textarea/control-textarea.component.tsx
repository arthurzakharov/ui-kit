import clsx from 'clsx';
import type { AnimationEvent, ReactNode } from 'react';
import { useBoolean } from 'usehooks-ts';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';
import { ControlBox } from '@controls/control-box';
import { ControlErrorMessage } from '@controls/control-error-message';
import { useControlInteraction } from '@controls/hooks';
import type { Interactive, State } from '@controls/utils/types';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-textarea/control-textarea.module.css';

export interface ControlTextareaProps extends Interactive<string>, Base {
  state?: State;
  placeholder?: string;
  rows?: number;
  message?: ReactNode;
}

export const ControlTextarea = ({
  id,
  value,
  onChange,
  state = 'idle',
  placeholder = '',
  rows = 5,
  message = '',
  disabled = false,
  onFocus,
  onBlur,
  ...base
}: ControlTextareaProps) => {
  const { value: isIdle, setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const { focused, emitChange, handleFocus, handleBlur } = useControlInteraction<string>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  const onAnimationStart = (e: AnimationEvent) => {
    if (e.animationName === cn['autofill-start']) makeActive();
    if (e.animationName === cn['autofill-cancel'] && !value) makeIdle();
  };

  const onTextareaFocus = () => {
    if (!value) makeActive();
    handleFocus();
  };

  const onTextareaBlur = () => {
    if (!value) makeIdle();
    handleBlur();
  };

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'control-textarea')}
      className={clsx(cn.Container, baseProps(base, 'className'))}
    >
      <ControlBox state={state} focused={focused} className={baseProps(base, 'className')}>
        <textarea
          data-testid="control-textarea-input"
          data-is-idle={isIdle}
          disabled={disabled}
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          className={cn.Input}
          onChange={(e) => emitChange(e.target.value, 'keyboard')}
          onAnimationStart={onAnimationStart}
          onFocus={onTextareaFocus}
          onBlur={onTextareaBlur}
        />
      </ControlBox>
      <AnimationFadeSlide name="text-message" condition={state === 'error' && !!message}>
        <ControlErrorMessage data-testid="control-textarea-error" className={cn.ErrorMessage}>
          {message}
        </ControlErrorMessage>
      </AnimationFadeSlide>
    </div>
  );
};
