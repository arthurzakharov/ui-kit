import { Check } from 'lucide-react';
import clsx from 'clsx';
import cn from './choice.module.css';

export interface ChoiceProps {
  type: 'radio' | 'checkbox';
  checked: boolean;
  state?: 'idle' | 'error' | 'success';
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
}

export const Choice = (props: ChoiceProps) => {
  const { type, checked, state = 'idle', focused = false, hovered = false, disabled = false } = props;

  return (
    <div
      data-testid="choice"
      className={clsx(cn.Choice, {
        [cn.ChoiceChecked]: checked,
        [cn.ChoiceFocused]: focused,
        [cn.ChoiceHovered]: hovered,
        [cn.ChoiceDisabled]: disabled,
        [cn.ChoiceTypeRadio]: type === 'radio',
        [cn.ChoiceTypeCheckbox]: type === 'checkbox',
        [cn.ChoiceStateIdle]: state === 'idle',
        [cn.ChoiceStateError]: state === 'error',
        [cn.ChoiceStateSuccess]: state === 'success' || checked,
      })}
    >
      {type === 'radio' && <div className={cn.ChoiceMark} />}
      {type === 'checkbox' && <Check className={cn.ChoiceMark} />}
    </div>
  );
};
