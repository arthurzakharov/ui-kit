import type { Interactive, RadioChoice, ChoiceValue, State } from '../../types';
import { Box } from '../box/box.component';
import { Choice } from '../choice/choice.component';
import { HiddenInput } from '../hidden-input/hidden-input.component';
import { RadioLabel } from '../radio-label/radio-label.component';
import { RadioText } from '../radio-text/radio-text.component';
import { useChoice } from '../../hooks/useChoice/useChoice.hook';
import { getChoiceId } from '../../utils/utils';
import cn from './card-text.module.css';

export interface CardTextProps extends Interactive<ChoiceValue> {
  choices: RadioChoice[];
  state?: State;
}

export const CardText = (props: CardTextProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { choices, state = 'idle', id, value, disabled = false, onChange } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={cn.CardText}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <RadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <Box state={state} checked={checked} focused={focused}>
                <div className={cn.CardTextLabel}>
                  <HiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_e, source) => onChoiceChange(choice.value, source)}
                  />
                  <div className={cn.CardTextChoice}>
                    <Choice
                      type={type}
                      state={state}
                      checked={checked}
                      focused={focused}
                      hovered={hovered}
                      disabled={disabled}
                    />
                  </div>
                  <RadioText size="lg" checked={checked}>
                    {choice.label}
                  </RadioText>
                </div>
              </Box>
            )}
          </RadioLabel>
        );
      })}
    </div>
  );
};
