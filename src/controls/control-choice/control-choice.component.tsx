import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import cn from '@controls/control-choice/control-choice.module.css';

export interface ControlChoiceProps extends Base {
  type: 'radio' | 'checkbox';
  checked: boolean;
  state?: 'idle' | 'error' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
}

export const ControlChoice = ({
  type,
  checked,
  state = 'idle',
  size = 'md',
  focused = false,
  hovered = false,
  disabled = false,
  className = '',
}: ControlChoiceProps) => (
  <div
    data-testid="choice"
    className={clsx(cn.Choice, className, {
      [cn.ChoiceChecked]: checked,
      [cn.ChoiceFocused]: focused,
      [cn.ChoiceHovered]: hovered,
      [cn.ChoiceDisabled]: disabled,
      [cn.ChoiceTypeRadio]: type === 'radio',
      [cn.ChoiceTypeCheckbox]: type === 'checkbox',
      [cn.ChoiceStateIdle]: state === 'idle',
      [cn.ChoiceStateError]: state === 'error',
      [cn.ChoiceStateSuccess]: state === 'success' || checked,
      [cn.ChoiceSizeXs]: size === 'xs',
      [cn.ChoiceSizeSm]: size === 'sm',
      [cn.ChoiceSizeMd]: size === 'md',
      [cn.ChoiceSizeLg]: size === 'lg',
      [cn.ChoiceSizeXl]: size === 'xl',
    })}
  >
    {type === 'radio' && <div className={cn.ChoiceMark} />}
    {type === 'checkbox' && <Check className={cn.ChoiceMark} />}
  </div>
);
