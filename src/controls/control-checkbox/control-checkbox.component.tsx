import type { ChangeEvent, MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import type { InputChangeSource, Interactive, State } from '@controls/utils/types';
import { ControlChoice, type ControlChoiceProps } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { useControlInteraction } from '@controls/hooks';
import { Converter } from '@utils/converter/converter.util';
import type { Base, FontSize } from '@utils/types';
import cn from '@controls/control-checkbox/control-checkbox.module.css';
import { AnimationFadeSlide } from '@animations/animation-fade-slide/animation-fade-slide.component';
import { ControlErrorMessage } from '@controls/control-error-message/control-error-message.component';
import { baseProps } from '@utils/functions';

export interface ControlCheckboxProps extends Interactive<boolean>, PropsWithChildren<Base> {
  state?: State;
  iconSize?: ControlChoiceProps['size'];
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
  message?: ReactNode;
}

export const ControlCheckbox = (props: ControlCheckboxProps) => {
  const {
    children,
    state = 'idle',
    iconSize = 'md',
    textSize = 'body-small',
    id,
    value,
    disabled = false,
    message = '',
    onChange,
    onFocus = () => {},
    onBlur = () => {},
    ...base
  } = props;

  const { value: hovered, setTrue: setHovered, setFalse: setNotHovered } = useBoolean(false);
  const { focused, emitChange, handleFocus, handleBlur } = useControlInteraction<boolean>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  const onLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
    if (disabled || focused) return;
    e.preventDefault();
    emitChange(!value);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>, source?: InputChangeSource) => {
    if (disabled) return;
    e.stopPropagation();
    emitChange(!value, source);
  };

  return (
    <div data-testid={baseProps(base, 'className', 'control-checkbox')} className={clsx(cn.ControlCheckbox, baseProps)}>
      <label
        htmlFor={id}
        className={cn.Label}
        onClick={onLabelClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={setHovered}
        onMouseLeave={setNotHovered}
      >
        <ControlHiddenInput
          type="checkbox"
          id={id}
          name={id}
          value={Converter.Boolean.ToBooleanString(value)}
          checked={value}
          disabled={disabled}
          onChange={onInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={cn.Choice}>
          <ControlChoice
            type="checkbox"
            size={iconSize}
            state={state}
            checked={value}
            focused={focused}
            hovered={hovered}
            disabled={disabled}
          />
        </div>
        <div
          className={clsx(cn.Content, {
            [cn.Body]: textSize === 'body',
            [cn.BodySmall]: textSize === 'body-small',
          })}
        >
          {children}
        </div>
      </label>
      <AnimationFadeSlide name="text-message" condition={state === 'error' && !!message}>
        <ControlErrorMessage className={cn.ErrorMessage}>{message}</ControlErrorMessage>
      </AnimationFadeSlide>
    </div>
  );
};
