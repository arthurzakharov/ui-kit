import { Pencil } from 'lucide-react';
import clsx from 'clsx';
import { Control } from '@components/control/control.component';
import type { BaseProps } from '@utils/types';
import cn from '@components/user-panel/user-panel.module.css';

export interface UserPanelProps extends BaseProps {
  title: string;
  button: string;
  data: string[];
  onClick: () => void;
}

export const UserPanel = ({ title, button, data, onClick, className = '' }: UserPanelProps) => (
  <div data-testid="user-panel" className={clsx(cn.UserPanel, className)}>
    <div className={cn.Head}>
      <span data-testid="user-panel-title">{title}</span>
      <Control.ButtonText
        preventDefault
        blurAfterClick
        icon={<Pencil className="XXX" />}
        iconPosition="right"
        size="md"
        color="primary"
        onClick={onClick}
      >
        {button}
      </Control.ButtonText>
    </div>
    <ul className={cn.Info}>
      {data.map((d, i) => (
        <li key={i}>{d}</li>
      ))}
    </ul>
  </div>
);
