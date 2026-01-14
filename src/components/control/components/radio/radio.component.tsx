import type { Interactive, RadioChoice, State } from '../../types';
import clsx from 'clsx';
import { Choice, type ChoiceProps } from '../choice/choice.component';
import { HiddenInput } from '../hidden-input/hidden-input.component';
import { RadioLabel } from '../radio-label/radio-label.component';
import { RadioText } from '../radio-text/radio-text.component';
import { getChoiceId } from '../../utils/utils';
import cn from './radio.module.css';

export interface RadioProps extends Interactive<string> {
  orientation: 'horizontal' | 'vertical';
  choices: RadioChoice[];
  state?: State;
  icon?: ChoiceProps['size'];
}

export const Radio = (props: RadioProps) => {
  // TODO: onFocus, onBlur can be declared but are not used
  const { orientation, choices, state = 'idle', icon = 'md', id, value, disabled = false, onChange } = props;

  return (
    <div
      className={clsx(cn.Radio, {
        [cn.RadioOrientationHorizontal]: orientation === 'horizontal',
        [cn.RadioOrientationVertical]: orientation === 'vertical',
      })}
    >
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <RadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <div className={cn.RadioLabel}>
                <Choice
                  type="radio"
                  size={icon}
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
                  onChange={() => onChange(choice.value, id)}
                />
                <RadioText size="lg" checked={checked}>
                  {choice.label}
                </RadioText>
              </div>
            )}
          </RadioLabel>
        );
      })}
    </div>
  );
};
