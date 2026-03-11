import { forwardRef, type PropsWithChildren } from 'react';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@components/information/information.module.css';

/**
 * Displays informational content with an icon and rich child elements.
 */
export const Information = forwardRef<HTMLDivElement, PropsWithChildren<Base>>(({ children, ...base }, ref) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'information')}
    className={clsx(cn.Information, baseProps(base, 'className'))}
    ref={ref}
  >
    <Info className={cn.Icon} />
    <div className={cn.Text}>{children}</div>
  </div>
));
