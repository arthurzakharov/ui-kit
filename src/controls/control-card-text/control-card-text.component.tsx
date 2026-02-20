import type { Interactive, RadioChoice, ChoiceValue, State } from '@controls/utils/types';
import { ControlBox } from '@controls/control-box';
import { ControlChoice } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { ControlRadioLabel } from '@controls/control-radio-label';
import { ControlRadioText } from '@controls/control-radio-text';
import { useChoice } from '@controls/hooks/useChoice';
import { getChoiceId } from '@controls/utils/functions';
import cn from '@controls/control-card-text/control-card-text.module.css';

export interface ControlCardTextProps extends Interactive<ChoiceValue> {
  choices: RadioChoice[];
  state?: State;
}

export const ControlCardText = (props: ControlCardTextProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { choices, state = 'idle', id, value, disabled = false, onChange } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={cn.CardText}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <ControlRadioLabel
            key={choiceId}
            id={choiceId}
            value={value}
            state={state}
            choice={choice}
            choices={choices}
          >
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
