import type { ReactNode } from 'react';
import clsx from 'clsx';
import { FadeScale } from '@animations/fade-scale';
import { Loader } from '@components/loader/loader.component';
import type { ControlButtonColor, ControlButtonSize, ControlButtonType } from '@controls/utils';
import { Content } from '@utils/content';
import { baseProps, withControl } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/button/button.module.css';

export interface ButtonProps extends Base {
  text: string;
  color?: ControlButtonColor;
  size?: ControlButtonSize;
  type?: ControlButtonType;
  disabled?: boolean;
  info?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Button = ({
  text,
  color = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  info = '',
  fullWidth = false,
  loading = false,
  preventDefault = false,
  blurAfterClick = false,
  onClick = () => {},
  onFocus,
  onBlur,
  ...base
}: ButtonProps) => (
  <button
    data-testid={baseProps(base, 'data-testid', 'button')}
    type={type}
    disabled={disabled || loading}
    className={clsx(cn.Button, baseProps(base, 'className'), {
      [cn.SM]: size === 'sm',
      [cn.MD]: size === 'md',
      [cn.LG]: size === 'lg',
      [cn.Primary]: color === 'primary',
      [cn.Secondary]: color === 'secondary',
      [cn.Tertiary]: color === 'tertiary',
      [cn.FullWidth]: fullWidth,
      [cn.Loading]: loading,
    })}
    onClick={withControl(onClick, { prevent: preventDefault, blur: blurAfterClick })}
    onFocus={() => onFocus?.()}
    onBlur={() => onBlur?.()}
  >
    <FadeScale name="loader" condition={loading} className={cn.Loader}>
      <Loader
        size="xs"
        color={(() => {
          switch (color) {
            case 'primary':
              return 'white';
            case 'secondary':
              return 'text-secondary';
            case 'tertiary':
              return 'text-primary';
          }
        })()}
      />
    </FadeScale>
    <FadeScale name="content" keepMount condition={!loading} className={cn.Content}>
      <span className={cn.Text}>{text}</span>
      <Content className={cn.Info}>{info}</Content>
    </FadeScale>
  </button>
);
