import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import cn from '@controls/control-radio-text/control-radio-text.module.css';

export interface ControlRadioTextProps extends Base, PropsWithChildren {
  size: 'md' | 'lg';
  checked: boolean;
  oneLine?: boolean;
  color?: 'primary' | 'secondary';
}

export const ControlRadioText = (props: ControlRadioTextProps) => {
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
