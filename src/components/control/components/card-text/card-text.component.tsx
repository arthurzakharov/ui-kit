import { RadioText } from '../radio-text';
import type { CardTextProps } from './card-text.types';
import { Box } from '../box';
import { Choice } from '../choice';
import { HiddenInput } from '../hidden-input';
import { RadioLabel } from '../radio-label';
import useChoice from '../../hooks/useChoice';
import { choiceId } from '../../utils';
import './card-text.css';

export const CardText = (props: CardTextProps) => {
  const { type, onChange } = useChoice(props.value, props.id, props.onChange);

  return (
    <div className="control-card-text">
      {props.choices.map((choice, index, choices) => {
        const id = choiceId(props.id, choice.value, index);
        return (
          <RadioLabel
            key={id}
            id={id}
            value={props.value}
            state={props.state || 'idle'}
            choice={choice}
            choices={choices}
          >
            {({ focused, hovered, checked, state }) => (
              <Box state={state} checked={checked} focused={focused}>
                <div className="control-card-text__label">
                  <HiddenInput
                    type={type}
                    id={id}
                    name={props.id}
                    value={choice.value}
                    checked={checked}
                    disabled={props.disabled}
                    onChange={(_e, source) => onChange(choice.value, source)}
                  />
                  <div className="control-card-text__choice">
                    <Choice
                      type={type}
                      state={state}
                      checked={checked}
                      focused={focused}
                      hovered={hovered}
                      disabled={props.disabled}
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
