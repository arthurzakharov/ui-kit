import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { Interactive, RadioChoice, State } from '@controls/utils/types';
import { ControlChoice, type ControlChoiceProps } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { ControlRadioLabel } from '@controls/control-radio-label';
import { ControlRadioText, type ControlRadioTextProps } from '@controls/control-radio-text';
import { getChoiceId } from '@controls/utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-radio/control-radio.module.css';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';
import { ControlErrorMessage } from '@controls/control-error-message';

export interface ControlRadioProps extends Base, Interactive<string> {
  orientation?: 'horizontal' | 'vertical';
  choices: RadioChoice[];
  state?: State;
  iconSize?: ControlChoiceProps['size'];
  textSize?: ControlRadioTextProps['size'];
  message?: ReactNode;
}

export const ControlRadio = ({
  id,
  value,
  choices,
  onChange,
  orientation = 'horizontal',
  state = 'idle',
  iconSize = 'md',
  textSize = 'body',
  message = '',
  disabled = false,
  onBlur = () => {},
  onFocus = () => {},
  className = '',
}: ControlRadioProps) => (
  <div className={clsx(cn.ControlRadio, className)}>
    <div
      className={clsx(cn.Content, className, {
        [cn.Horizontal]: orientation === 'horizontal',
        [cn.Vertical]: orientation === 'vertical',
      })}
    >
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <ControlRadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <div className={cn.Label}>
                <ControlChoice
                  type="radio"
                  size={iconSize}
                  state={state}
                  checked={checked}
                  focused={focused}
                  hovered={hovered}
                  disabled={disabled}
                />
                <ControlHiddenInput
                  type="radio"
                  id={choiceId}
                  value={choice.value}
                  name={id}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onChange(choice.value, id)}
                  onFocus={() => onFocus(id)}
                  onBlur={() => onBlur(id)}
                />
                <ControlRadioText size={textSize} checked={checked}>
                  {choice.label}
                </ControlRadioText>
              </div>
            )}
          </ControlRadioLabel>
        );
      })}
    </div>
    <AnimationFadeSlide name="message" condition={state === 'error' && !!message}>
      <ControlErrorMessage className={cn.ErrorMessage}>{message}</ControlErrorMessage>
    </AnimationFadeSlide>
  </div>
);
