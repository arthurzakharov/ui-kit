import clsx from 'clsx';
import { Box } from '@controls/primitives/box';
import { Caption } from '@controls/primitives/caption';
import { Choice, type ChoiceProps } from '@controls/primitives/choice';
import { HiddenInput } from '@controls/primitives/hidden-input';
import { RadioLabel } from '@controls/primitives/radio-label';
import { useChoice, getChoiceId, type ChoiceValue, type Interactive, type RadioChoice } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base, FontSize } from '@utils/types';
import cn from '@controls/interactives/card-text/card-text.module.css';

export interface CardTextProps extends Base, Interactive<ChoiceValue> {
  choices: RadioChoice[];
  iconSize?: ChoiceProps['size'];
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
}

export const CardText = ({
  // Interactive props
  id,
  value,
  disabled = false,
  state = 'idle',
  onChange,
  onBlur,
  onFocus,
  // CardText props
  choices,
  iconSize = 'md',
  textSize = 'body',
  // Base props
  ...base
}: CardTextProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'card-text')}
      className={clsx(cn.CardText, baseProps(base, 'className'))}
    >
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <RadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <Box state={state} checked={checked} focused={focused}>
                <div className={cn.Label}>
                  <HiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_e, source) => onChoiceChange(choice.value, source)}
                    onFocus={() => onFocus?.(id)}
                    onBlur={() => onBlur?.(id)}
                  />
                  <div className={cn.Choice}>
                    <Choice
                      type={type}
                      size={iconSize}
                      state={state}
                      checked={checked}
                      focused={focused}
                      hovered={hovered}
                      disabled={disabled}
                    />
                  </div>
                  <Caption text={choice.label} size={textSize} checked={checked} />
                </div>
              </Box>
            )}
          </RadioLabel>
        );
      })}
    </div>
  );
};
