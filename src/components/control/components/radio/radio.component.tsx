import type { RadioProps } from './radio.types';
import clsx from 'clsx';
import { Choice } from '../choice';
import { HiddenInput } from '../hidden-input';
import { RadioLabel } from '../radio-label';
import { RadioText } from '../radio-text';
import { choiceId } from '../../utils';
import './radio.css';

export const Radio = (props: RadioProps) => {
  const radioCn = clsx('control-radio', {
    'control-radio--horizontal': props.orientation === 'horizontal',
    'control-radio--vertical': props.orientation === 'vertical',
  });

  return (
    <div className={radioCn}>
      {props.choices.map((choice, index, choices) => {
        const id = choiceId(props.id, choice.value, index);
        return (
          <RadioLabel key={id} id={id} value={props.value} state={props.state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <div className="control-radio__label">
                <Choice
                  type="radio"
                  state={state}
                  checked={checked}
                  focused={focused}
                  hovered={hovered}
                  disabled={props.disabled}
                />
                <HiddenInput
                  type="radio"
                  id={id}
                  value={choice.value}
                  name={props.id}
                  checked={checked}
                  disabled={props.disabled}
                  onChange={() => props.onChange(choice.value, props.id)}
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
