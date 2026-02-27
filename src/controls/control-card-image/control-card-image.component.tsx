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
import cn from '@controls/control-card-image/control-card-image.module.css';

export interface ControlCardImageProps extends Base, Interactive<ChoiceValue> {
  sprite: string;
  choices: RadioChoice[];
  state?: State;
}

export const ControlCardImage = (props: ControlCardImageProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { sprite, choices, state = 'idle', id, value, disabled, onChange, className } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={clsx(cn.ControlCardImage, className)}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <ControlRadioLabel key={choiceId} id={choiceId} value={value} state={state} choice={choice} choices={choices}>
            {({ focused, hovered, checked, state }) => (
              <ControlBox state={state} checked={checked} focused={focused}>
                <div className={cn.Content}>
                  <ControlHiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onChoiceChange(choice.value)}
                  />
                  <div className={cn.Top}>
                    <div data-image={choice.icon} style={{ backgroundImage: `url(${sprite})` }} className={cn.Wrap} />
                  </div>
                  <div className={cn.Bottom}>
                    <div>
                      <ControlChoice
                        type={type}
                        state={state}
                        checked={checked}
                        focused={focused}
                        hovered={hovered}
                        disabled={disabled}
                      />
                    </div>
                    <ControlRadioText size="body-small" checked={checked}>
                      {choice.label}
                    </ControlRadioText>
                  </div>
                </div>
              </ControlBox>
            )}
          </ControlRadioLabel>
        );
      })}
    </div>
  );
};
