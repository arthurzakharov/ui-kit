import clsx from 'clsx';
import type { Interactive, RadioChoice, State } from '@controls/utils/types';
import { ControlChoice, type ControlChoiceProps } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { ControlRadioLabel } from '@controls/control-radio-label';
import { ControlRadioText } from '@controls/control-radio-text';
import { getChoiceId } from '@controls/utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-radio/control-radio.module.css';

export type ControlRadioProps = {
  orientation: 'horizontal' | 'vertical';
  choices: RadioChoice[];
  state?: State;
  icon?: ControlChoiceProps['size'];
} & Interactive<string> &
  Base;

export const ControlRadio = (props: ControlRadioProps) => {
  // TODO: onFocus, onBlur can be declared but are not used
  const { orientation, choices, state = 'idle', icon = 'md', id, value, disabled = false, onChange, className } = props;

  return (
    <div
      className={clsx(cn.Radio, className, {
        [cn.RadioOrientationHorizontal]: orientation === 'horizontal',
        [cn.RadioOrientationVertical]: orientation === 'vertical',
      })}
    >
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <ControlRadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <div className={cn.RadioLabel}>
                <ControlChoice
                  type="radio"
                  size={icon}
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
                />
                <ControlRadioText size="lg" checked={checked}>
                  {choice.label}
                </ControlRadioText>
              </div>
            )}
          </ControlRadioLabel>
        );
      })}
    </div>
  );
};
