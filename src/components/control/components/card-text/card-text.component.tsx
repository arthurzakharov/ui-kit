import type { CardTextProps } from '@/components/control/components/card-text/card-text.types';
import { Control } from '@/components/control';
import { useChoice } from '@/components/control/hooks';
import { getChoiceId } from '@/components/control/utils';
import cn from '@/components/control/components/card-text/card-text.module.css';

export const CardText = (props: CardTextProps) => {
  // TODO: onFocus and onBlur are not used even though they can be passed
  const { choices, state = 'idle', id, value, disabled = false, onChange } = props;
  const { type, onChoiceChange } = useChoice(value, id, onChange);

  return (
    <div className={cn.CardText}>
      {choices.map((choice, index, choices) => {
        const choiceId = getChoiceId(id, choice.value, index);
        return (
          <Control.RadioLabel
            key={choiceId}
            id={choiceId}
            value={value}
            state={state}
            choice={choice}
            choices={choices}
          >
            {({ focused, hovered, checked, state }) => (
              <Control.Box state={state} checked={checked} focused={focused}>
                <div className={cn.CardTextLabel}>
                  <Control.HiddenInput
                    type={type}
                    id={choiceId}
                    name={id}
                    value={choice.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={(_e, source) => onChoiceChange(choice.value, source)}
                  />
                  <div className={cn.CardTextChoice}>
                    <Control.Choice
                      type={type}
                      state={state}
                      checked={checked}
                      focused={focused}
                      hovered={hovered}
                      disabled={disabled}
                    />
                  </div>
                  <Control.RadioText size="lg" checked={checked}>
                    {choice.label}
                  </Control.RadioText>
                </div>
              </Control.Box>
            )}
          </Control.RadioLabel>
        );
      })}
    </div>
  );
};
