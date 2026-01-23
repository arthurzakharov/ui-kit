import { LockKeyhole } from 'lucide-react';
import clsx from 'clsx';
import cn from '@components/data-protected-label/data-protected-label.module.css';

export interface DataProtectedLabelProps {
  text?: string;
  align?: 'left' | 'center' | 'right';
}

export const DataProtectedLabel = (props: DataProtectedLabelProps) => {
  const { text = 'Höchste Datensicherheit', align = 'center' } = props;

  return (
    <div
      className={clsx(cn.DataProtectedLabel, {
        [cn.DataProtectedLabelAlignLeft]: align === 'left',
        [cn.DataProtectedLabelAlignCenter]: align === 'center',
        [cn.DataProtectedLabelAlignRight]: align === 'right',
      })}
    >
      <LockKeyhole className={cn.DataProtectedLabelIcon} />
      <span className={cn.DataProtectedLabelText}>{text}</span>
    </div>
  );
};
