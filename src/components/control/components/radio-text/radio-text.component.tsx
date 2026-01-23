import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import cn from '@components/control/components/radio-text/radio-text.module.css';

export interface RadioTextProps extends PropsWithChildren {
  size: 'md' | 'lg';
  checked: boolean;
  oneLine?: boolean;
  color?: 'primary' | 'secondary';
  className?: string;
}

export const RadioText = (props: RadioTextProps) => {
  const { children, size, checked, oneLine = false, color = 'primary', className = '' } = props;

  return (
    <div
      className={clsx(cn.RadioText, className, {
        [cn.RadioTextColorPrimary]: color === 'primary',
        [cn.RadioTextColorSecondary]: color === 'secondary',
        [cn.RadioTextSizeMd]: size === 'md',
        [cn.RadioTextSizeLg]: size === 'lg',
        [cn.RadioTextOneLine]: oneLine,
      })}
    >
      {typeof children === 'string' ? (
        <span data-checked={checked} className={cn.RadioTextContent} dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        <span data-checked={checked} className={cn.RadioTextContent}>
          {children}
        </span>
      )}
    </div>
  );
};
