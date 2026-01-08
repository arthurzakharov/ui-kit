import type { RadioProps } from '@/components/control/components/radio/radio.types';
import clsx from 'clsx';
import { Control } from '@/components/control';
import { getChoiceId } from '@/components/control/utils';
import cn from '@/components/control/components/radio/radio.module.css';

export const Radio = (props: RadioProps) => {
  // TODO: onFocus, onBlur can be declared but are not used
  const { orientation, choices, state = 'idle', id, value, disabled = false, onChange } = props;

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
          <Control.RadioLabel
            key={choiceId}
            id={choiceId}
            value={value}
            state={state}
            choice={choice}
            choices={choices}
          >
            {({ focused, hovered, checked, state }) => (
              <div className={cn.RadioLabel}>
                <Control.Choice
                  type="radio"
                  state={state}
                  checked={checked}
                  focused={focused}
                  hovered={hovered}
                  disabled={disabled}
                />
                <Control.HiddenInput
                  type="radio"
                  id={choiceId}
                  value={choice.value}
                  name={id}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onChange(choice.value, id)}
                />
                <Control.RadioText size="lg" checked={checked}>
                  {choice.label}
                </Control.RadioText>
              </div>
            )}
          </Control.RadioLabel>
        );
      })}
    </div>
  );
};
