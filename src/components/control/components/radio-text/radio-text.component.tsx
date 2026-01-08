import clsx from 'clsx';
import cn from './radio-text.module.css';

export interface RadioTextProps {
  children: string;
  size: 'md' | 'lg';
  checked: boolean;
  oneLine?: boolean;
}

export const RadioText = (props: RadioTextProps) => {
  const { children, size, checked, oneLine = false } = props;

  return (
    <div
      className={clsx(cn.RadioText, {
        [cn.RadioTextSizeMd]: size === 'md',
        [cn.RadioTextSizeLg]: size === 'lg',
        [cn.RadioTextOneLine]: oneLine,
      })}
    >
      <span
        data-text={children}
        data-checked={checked}
        className={cn.RadioTextContent}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
};
