import type { CardImageProps } from './card-image.types';
import { Box } from '../box';
import { Choice } from '../choice';
import { HiddenInput } from '../hidden-input';
import { RadioLabel } from '../radio-label';
import { RadioText } from '../radio-text';
import useChoice from '../../hooks/useChoice';
import { choiceId } from '../../utils';
import './card-image.css';

export const CardImage = (props: CardImageProps) => {
  const { type, onChange } = useChoice(props.value, props.id, props.onChange);

  return (
    <div className="control-card-image">
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
                <div className="control-card-image__content">
                  <HiddenInput
                    type={type}
                    id={id}
                    name={props.id}
                    value={choice.value}
                    checked={checked}
                    disabled={props.disabled}
                    onChange={() => onChange(choice.value)}
                  />
                  <div className="control-card-image__top">
                    <div
                      data-image={choice.icon}
                      style={{ backgroundImage: `url(${props.sprite})` }}
                      className="control-card-image__image"
                    />
                  </div>
                  <div className="control-card-image__bottom">
                    <div>
                      <Choice
                        type={type}
                        state={state}
                        checked={checked}
                        focused={focused}
                        hovered={hovered}
                        disabled={props.disabled}
                      />
                    </div>
                    <RadioText size="md" checked={checked}>
                      {choice.label}
                    </RadioText>
                  </div>
                </div>
              </Box>
            )}
          </RadioLabel>
        );
      })}
    </div>
  );
};
