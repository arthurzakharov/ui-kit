import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { ControlButtonSize, ControlButtonType, ControlButtonTypeColor } from '@controls/utils';
import { withControl } from '@utils/functions';
import type { Base, FontWeight } from '@utils/types';
import { Svg, type SvgProps } from '@utils/svg';
import cn from '@controls/control-button-text/control-button-text.module.css';

export interface ControlButtonTextProps extends PropsWithChildren<Base> {
  color?: ControlButtonTypeColor;
  size?: ControlButtonSize;
  type?: ControlButtonType;
  weight?: FontWeight;
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

export const ControlButtonText = ({
  children,
  size = 'md',
  color = 'text-primary',
  weight = 'medium',
  type = 'button',
  icon = null,
  iconPosition = 'left',
  underlined = false,
  disabled = false,
  preventDefault = false,
  blurAfterClick = false,
  onClick = () => {},
  onFocus = () => {},
  onBlur = () => {},
  className = '',
  ...rest
}: ControlButtonTextProps) => (
  <button
    data-testid={rest['data-testid']}
    type={type}
    disabled={disabled}
    className={clsx(cn.ControlButtonText, className, {
      [cn.Left]: iconPosition === 'left',
      [cn.Right]: iconPosition === 'right',
      [cn.SM]: size === 'sm',
      [cn.MD]: size === 'md',
      [cn.LG]: size === 'lg',
      [cn.TextPrimary]: color === 'text-primary',
      [cn.TextSecondary]: color === 'text-secondary',
      [cn.AccentPrimary]: color === 'accent-primary',
      [cn.AccentSecondary]: color === 'accent-secondary',
      [cn.ThemePrimary]: color === 'theme-primary',
      [cn.ThemeSecondary]: color === 'theme-secondary',
    })}
    onClick={withControl(onClick, { prevent: preventDefault, blur: blurAfterClick })}
    onFocus={() => onFocus()}
    onBlur={() => onBlur()}
  >
    <Svg icon={icon} className={cn.Icon} />
    <span
      className={clsx(cn.Content, {
        [cn.Light]: weight === 'light',
        [cn.Regular]: weight === 'regular',
        [cn.Medium]: weight === 'medium',
        [cn.Bold]: weight === 'bold',
        [cn.Underlined]: underlined,
      })}
    >
      {children}
    </span>
  </button>
);
