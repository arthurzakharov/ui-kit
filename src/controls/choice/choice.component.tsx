import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { ControlChoiceType, State } from '@controls/utils';
import type { Base, Size } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@controls/choice/choice.module.css';

export interface ChoiceProps extends Base {
  type: ControlChoiceType;
  checked: boolean;
  state?: State;
  size?: Size;
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
}

export const Choice = ({
  type,
  checked,
  state = 'idle',
  size = 'md',
  focused = false,
  hovered = false,
  disabled = false,
  ...base
}: ChoiceProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'choice')}
    className={clsx(cn.Choice, baseProps(base, 'className'), {
      [cn.Checked]: checked,
      [cn.Focused]: focused,
      [cn.Hovered]: hovered,
      [cn.Disabled]: disabled,
      [cn.Radio]: type === 'radio',
      [cn.Checkbox]: type === 'checkbox',
      [cn.Idle]: state === 'idle',
      [cn.Error]: state === 'error',
      [cn.Success]: state === 'success',
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
    {type === 'radio' && <div data-testid="choice-radio" className={cn.Mark} />}
    {type === 'checkbox' && <Check data-testid="choice-checkbox" className={cn.Mark} />}
  </div>
);
