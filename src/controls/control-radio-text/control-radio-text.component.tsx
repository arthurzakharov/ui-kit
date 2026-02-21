import clsx from 'clsx';
import type { BaseWithChildren } from '@utils/types';
import cn from '@controls/control-radio-text/control-radio-text.module.css';

export type ControlRadioTextProps = {
  size: 'md' | 'lg';
  checked: boolean;
  oneLine?: boolean;
  color?: 'primary' | 'secondary';
} & BaseWithChildren;

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
