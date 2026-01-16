import clsx from 'clsx';
import { type MouseEvent, type PropsWithChildren, type ReactElement, cloneElement, isValidElement } from 'react';
import cn from './button-text.module.css';

export interface ButtonTextProps extends PropsWithChildren {
  size?: 'sm' | 'md' | 'lg';
  type?: 'submit' | 'reset' | 'button';
  icon?: ReactElement<SVGElement>;
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
      {isValidElement(icon)
        ? cloneElement<SVGElement>(icon, {
            className: cn.ButtonTextIcon,
          })
        : icon}
      <span className={cn.ButtonTextContent}>{children}</span>
    </button>
  );
};
