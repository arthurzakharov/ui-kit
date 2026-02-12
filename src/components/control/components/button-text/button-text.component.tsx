import { type MouseEvent, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Svg, type SvgProps } from '@utils/svg';
import cn from '@components/control/components/button-text/button-text.module.css';

export interface ButtonTextProps extends PropsWithChildren {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent-primary' | 'accent-secondary' | 'theme-primary' | 'theme-secondary';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  type?: 'submit' | 'reset' | 'button';
  icon?: SvgProps['icon'];
  iconPosition?: 'left' | 'right';
  underlined?: boolean;
  disabled?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ButtonText = (props: ButtonTextProps) => {
  const {
    children,
    size = 'md',
    color = 'primary',
    weight = 'medium',
    type = 'button',
    icon = null,
    iconPosition = 'left',
    underlined = false,
    disabled = false,
    preventDefault = false,
    blurAfterClick = false,
    onClick,
    onFocus,
    onBlur,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(cn.ButtonText, {
        [cn.ButtonTextIconPositionLeft]: iconPosition === 'left',
        [cn.ButtonTextIconPositionRight]: iconPosition === 'right',
        [cn.ButtonTextSizeSm]: size === 'sm',
        [cn.ButtonTextSizeMd]: size === 'md',
        [cn.ButtonTextSizeLg]: size === 'lg',
        [cn.ButtonTextColorPrimary]: color === 'primary',
        [cn.ButtonTextColorSecondary]: color === 'secondary',
        [cn.ButtonTextColorAccentPrimary]: color === 'accent-primary',
        [cn.ButtonTextColorAccentSecondary]: color === 'accent-secondary',
        [cn.ButtonTextColorThemePrimary]: color === 'theme-primary',
        [cn.ButtonTextColorThemeSecondary]: color === 'theme-secondary',
      })}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (preventDefault) e.preventDefault();
        if (blurAfterClick) e.currentTarget.blur();
        onClick?.call(null);
      }}
      onFocus={() => onFocus?.call(null)}
      onBlur={() => onBlur?.call(null)}
    >
      <Svg icon={icon} className={cn.ButtonTextIcon} />
      <span
        className={clsx(cn.ButtonTextContent, {
          [cn.ButtonTextContentWeightLight]: weight === 'light',
          [cn.ButtonTextContentWeightRegular]: weight === 'regular',
          [cn.ButtonTextContentWeightMedium]: weight === 'medium',
          [cn.ButtonTextContentWeightBold]: weight === 'bold',
          [cn.ButtonTextContentUnderlined]: underlined,
        })}
      >
        {children}
      </span>
    </button>
  );
};
