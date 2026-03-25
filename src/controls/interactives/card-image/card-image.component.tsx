import clsx from 'clsx';
import { Box } from '@controls/primitives/box';
import { Caption } from '@controls/primitives/caption';
import { Choice, type ChoiceProps } from '@controls/primitives/choice';
import { HiddenInput } from '@controls/primitives/hidden-input';
import { RadioLabel } from '@controls/primitives/radio-label';
import { useChoice } from '@controls/utils';
import { getChoiceId, type ChoiceValue, type Interactive, type RadioChoice } from '@controls/utils';
import type { Base, FontSize } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@controls/interactives/card-image/card-image.module.css';

export interface CardImageProps extends Base, Interactive<ChoiceValue> {
  sprite: string;
  choices: RadioChoice[];
  iconSize?: ChoiceProps['size'];
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
}

export const CardImage = ({
  // Interactive props
  id,
  value,
  disabled = false,
  state = 'idle',
  onChange,
  onFocus,
  onBlur,
  // CardImage props
  sprite,
  choices,
  iconSize = 'md',
  textSize = 'body-small',
  // Base props
  ...base
}: CardImageProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'card-image')}
      className={clsx(cn.CardImage, baseProps(base, 'className'))}
    >
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <RadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <Box state={state} checked={checked} focused={focused}>
                <div className={cn.Content}>
                  <HiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_, source) => onChoiceChange(choice.value, source)}
                    onFocus={() => onFocus?.(id)}
                    onBlur={() => onBlur?.(id)}
                  />
                  <div className={cn.Top}>
                    <div data-image={choice.icon} style={{ backgroundImage: `url(${sprite})` }} className={cn.Wrap} />
                  </div>
                  <div className={cn.Bottom}>
                    <div>
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
                </div>
              </Box>
            )}
          </RadioLabel>
        );
      })}
    </div>
  );
};
