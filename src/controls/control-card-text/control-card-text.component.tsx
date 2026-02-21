import type { Interactive, RadioChoice, ChoiceValue, State } from '@controls/utils/types';
import type { Base } from '@utils/types';
import clsx from 'clsx';
import { ControlBox } from '@controls/control-box';
import { ControlChoice } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { ControlRadioLabel } from '@controls/control-radio-label';
import { ControlRadioText } from '@controls/control-radio-text';
import { useChoice } from '@controls/hooks/use-choice';
import { getChoiceId } from '@controls/utils/functions';
import cn from '@controls/control-card-text/control-card-text.module.css';

export type ControlCardTextProps = {
  choices: RadioChoice[];
  state?: State;
} & Interactive<ChoiceValue> &
  Base;

export const ControlCardText = (props: ControlCardTextProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { choices, state = 'idle', id, value, disabled = false, onChange, className } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={clsx(cn.CardText, className)}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <ControlRadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <ControlBox state={state} checked={checked} focused={focused}>
                <div className={cn.CardTextLabel}>
                  <ControlHiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_e, source) => onChoiceChange(choice.value, source)}
                  />
                  <div className={cn.CardTextChoice}>
                    <ControlChoice
                      type={type}
                      state={state}
                      checked={checked}
                      focused={focused}
                      hovered={hovered}
                      disabled={disabled}
                    />
                  </div>
                  <ControlRadioText size="lg" checked={checked}>
                    {choice.label}
                  </ControlRadioText>
                </div>
              </ControlBox>
            )}
          </ControlRadioLabel>
        );
      })}
    </div>
  );
};
