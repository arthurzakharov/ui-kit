import { forwardRef, type PropsWithChildren } from 'react';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import cn from '@components/information/information.module.css';

export interface InformationProps extends PropsWithChildren {
  size?: 'regular' | 'small' | 'extra-small';
  color?: 'primary' | 'secondary' | 'accent-primary' | 'accent-secondary';
  className?: string;
}

export const Information = forwardRef<HTMLDivElement, InformationProps>((props, ref) => {
  const { children, size = 'regular', color = 'primary', className = '' } = props;

  return (
    <div
      ref={ref}
      className={clsx(cn.Information, className, {
        [cn.InformationColorPrimary]: color === 'primary',
        [cn.InformationSizeRegular]: size === 'regular',
        [cn.InformationSizeSmall]: size === 'small',
        [cn.InformationSizeExtraSmall]: size === 'extra-small',
        [cn.InformationColorSecondary]: color === 'secondary',
        [cn.InformationColorAccentPrimary]: color === 'accent-primary',
        [cn.InformationColorAccentSecondary]: color === 'accent-secondary',
      })}
    >
      <Info className={cn.InformationIcon} />
      <div className={cn.InformationText}>{children}</div>
    </div>
  );
});
