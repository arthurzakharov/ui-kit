import clsx from 'clsx';
import { FadeSlide } from '@animations/fade-slide';
import {
  Choice,
  type ChoiceProps,
  Caption,
  type CaptionProps,
  ErrorMessage,
  HiddenInput,
  RadioLabel,
} from '@controls/primitives';
import {useControlInteraction, getChoiceId, type Interactive, type RadioChoice } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/interactives/radio/radio.module.css';

export interface RadioProps extends Base, Interactive<string> {
  orientation?: 'horizontal' | 'vertical';
  choices: RadioChoice[];
  iconSize?: ChoiceProps['size'];
  textSize?: CaptionProps['size'];
  message?: string;
}

export const Radio = ({
  // Interactive props
  id,
  value = '',
  disabled = false,
  state = 'idle',
  onChange,
  onFocus,
  onBlur,
  // Radio props
  choices,
  orientation = 'horizontal',
  iconSize = 'md',
  textSize = 'body',
  message = '',
  // Base props
  ...base
}: RadioProps) => {
  const { emitChange, handleFocus, handleBlur } = useControlInteraction<string>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'radio')}
      className={clsx(cn.Radio, baseProps(base, 'className'))}
    >
      <div
        className={clsx(cn.Content, {
          [cn.Horizontal]: orientation === 'horizontal',
          [cn.Vertical]: orientation === 'vertical',
        })}
      >
        {choices.map((choice, index, choices) => {
          const choiceId = getChoiceId(id, choice.value, index);
          return (
            <RadioLabel
              key={choiceId}
              id={choiceId}
              value={value}
              state={state}
              choice={choice}
              choices={choices}
            >
              {({ focused, hovered, checked, state }) => (
                <div className={cn.Label}>
                  <Choice
                    type="radio"
                    size={iconSize}
                    state={state}
                    checked={checked}
                    focused={focused}
                    hovered={hovered}
                    disabled={disabled}
                  />
                  <HiddenInput
                    type="radio"
                    id={choiceId}
                    value={choice.value}
                    name={id}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_, source) => emitChange(choice.value, source)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <Caption text={choice.label} size={textSize} checked={checked} />
                </div>
              )}
            </RadioLabel>
          );
        })}
      </div>
      <FadeSlide name="message" condition={state === 'error' && !!message}>
        <ErrorMessage text={message} className={cn.ErrorMessage} />
      </FadeSlide>
    </div>
  );
};
