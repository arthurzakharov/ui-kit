import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { State, ControlChoiceType } from '@controls/utils';
import type { Base, Size } from '@utils/types';
import cn from '@controls/control-choice/control-choice.module.css';

export interface ControlChoiceProps extends Base {
  type: ControlChoiceType;
  checked: boolean;
  state?: State;
  size?: Size;
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
    className={clsx(cn.ControlChoice, className, {
      [cn.Checked]: checked,
      [cn.Focused]: focused,
      [cn.Hovered]: hovered,
      [cn.Disabled]: disabled,
      [cn.Radio]: type === 'radio',
      [cn.Checkbox]: type === 'checkbox',
      [cn.Idle]: state === 'idle',
      [cn.Error]: state === 'error',
      [cn.Success]: state === 'success' || checked,
      [cn.XXS]: size === 'xxs',
      [cn.XS]: size === 'xs',
      [cn.SM]: size === 'sm',
      [cn.MD]: size === 'md',
      [cn.LG]: size === 'lg',
      [cn.XL]: size === 'xl',
      [cn.XXL]: size === 'xxl',
      [cn.XXXL]: size === 'xxxl',
    })}
  >
    {type === 'radio' && <div className={cn.ChoiceMark} />}
    {type === 'checkbox' && <Check className={cn.ChoiceMark} />}
  </div>
);
