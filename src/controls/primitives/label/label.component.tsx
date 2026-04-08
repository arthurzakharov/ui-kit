import clsx from 'clsx';
import type { ControlLabelPosition, State } from '@controls/utils';
import { Content } from '@utils/content';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/primitives/label/label.module.css';

export interface LabelProps extends Base {
  text: string;
  state?: State;
  position?: ControlLabelPosition;
}

export const Label = ({
  // Label props
  text,
  state = 'idle',
  position = 'idle',
  // Base props
  ...base
}: LabelProps) => (
  <Content
    data-testid={baseProps(base, 'data-testid', 'label')}
    className={clsx(cn.Label, baseProps(base, 'className'), {
      [cn.Idle]: position === 'idle',
      [cn.Active]: position === 'active',
      [cn.Error]: state === 'error',
      [cn.Success]: state === 'success',
    })}
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    {text}
  </Content>
);
