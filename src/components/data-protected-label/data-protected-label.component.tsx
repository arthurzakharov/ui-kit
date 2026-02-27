import { LockKeyhole } from 'lucide-react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { FontAlign, Base } from '@utils/types';
import cn from '@components/data-protected-label/data-protected-label.module.css';

interface DataProtectedLabelProps extends Base {
  align?: FontAlign;
}

export const DataProtectedLabel = ({ align = 'center', ...base }: DataProtectedLabelProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'data-protected-label')}
    className={clsx(cn.DataProtectedLabel, baseProps(base, 'className'), {
      [cn.Left]: align === 'left',
      [cn.Center]: align === 'center',
      [cn.Right]: align === 'right',
    })}
  >
    <LockKeyhole data-testid="data-protected-label-icon" className={cn.Icon} />
    <span data-testid="data-protected-label-text" className={cn.Text}>
      Höchste Datensicherheit
    </span>
  </div>
);
