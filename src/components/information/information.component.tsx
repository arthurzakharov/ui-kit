import { forwardRef, type PropsWithChildren } from 'react';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import cn from '@components/information/information.module.css';

export type InformationProps = PropsWithChildren<Base>;

export const Information = forwardRef<HTMLDivElement, InformationProps>(({ children, className = '' }, ref) => (
  <div data-testid="information" ref={ref} className={clsx(cn.Information, className)}>
    <Info className={cn.Icon} />
    <div className={cn.Text}>{children}</div>
  </div>
));
