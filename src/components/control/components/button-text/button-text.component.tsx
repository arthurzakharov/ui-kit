import { type MouseEvent, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Svg, type SvgProps } from '../../../../main';
import cn from './button-text.module.css';

export interface ButtonTextProps extends PropsWithChildren {
  size?: 'sm' | 'md' | 'lg';
  type?: 'submit' | 'reset' | 'button';
  icon?: SvgProps['icon'];
  disabled?: boolean;
  preventDefault?: boolean;
  blurAfterCLick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ButtonText = (props: ButtonTextProps) => {
  const {
    children,
    size = 'md',
    type = 'button',
    icon = null,
    disabled = false,
    preventDefault = false,
    blurAfterCLick = false,
    onClick,
    onFocus,
    onBlur,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(cn.ButtonText, {
        [cn.ButtonTextSizeSm]: size === 'sm',
        [cn.ButtonTextSizeMd]: size === 'md',
        [cn.ButtonTextSizeLg]: size === 'lg',
      })}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (preventDefault) e.preventDefault();
        if (blurAfterCLick) e.currentTarget.blur();
        onClick?.call(null);
      }}
      onFocus={() => onFocus?.call(null)}
      onBlur={() => onBlur?.call(null)}
    >
      <Svg icon={icon} className={cn.ButtonTextIcon} />
      <span className={cn.ButtonTextContent}>{children}</span>
    </button>
  );
};
