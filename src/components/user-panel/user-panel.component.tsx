import { Pencil } from 'lucide-react';
import clsx from 'clsx';
import { ButtonText } from '@controls/button-text';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/user-panel/user-panel.module.css';

export interface UserPanelProps extends Base {
  title: string;
  button: string;
  data: string[];
  onClick: () => void;
}

export const UserPanel = ({ title, button, data, onClick, ...base }: UserPanelProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'user-panel')}
    className={clsx(cn.UserPanel, baseProps(base, 'className'))}
  >
    <div className={cn.Head}>
      <span data-testid="user-panel-title">{title}</span>
      <ButtonText
        text={button}
        preventDefault
        blurAfterClick
        icon={<Pencil />}
        iconPosition="right"
        size="md"
        color="text-primary"
        onClick={onClick}
      />
    </div>
    <ul className={cn.Info}>
      {data.map((d, i) => (
        <li key={i}>{d}</li>
      ))}
    </ul>
  </div>
);
