import type { Interactive, RadioChoice, ChoiceValue, State } from '../../types';
import { Box } from '../box/box.component';
import { Choice } from '../choice/choice.component';
import { HiddenInput } from '../hidden-input/hidden-input.component';
import { RadioLabel } from '../radio-label/radio-label.component';
import { RadioText } from '../radio-text/radio-text.component';
import { useChoice } from '../../hooks/useChoice/useChoice.hook';
import { getChoiceId } from '../../utils/utils';
import cn from './card-image.module.css';

export interface CardImageProps extends Interactive<ChoiceValue> {
  sprite: string;
  choices: RadioChoice[];
  state?: State;
}

export const CardImage = (props: CardImageProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { sprite, choices, state = 'idle', id, value, disabled, onChange } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={cn.CardImage}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <RadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <Box state={state} checked={checked} focused={focused}>
                <div className={cn.CardImageContent}>
                  <HiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onChoiceChange(choice.value)}
                  />
                  <div className={cn.CardImageTop}>
                    <div
                      data-image={choice.icon}
                      style={{ backgroundImage: `url(${sprite})` }}
                      className={cn.CardImageWrap}
                    />
                  </div>
                  <div className={cn.CardImageBottom}>
                    <div>
                      <Choice
                        type={type}
                        state={state}
                        checked={checked}
                        focused={focused}
                        hovered={hovered}
                        disabled={disabled}
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
