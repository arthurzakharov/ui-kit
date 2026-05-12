import type { ReactNode } from 'react';
import clsx from 'clsx';
import { FadeScale } from '@animations/fade-scale';
import { Loader } from '@components/loader';
import type { ControlButtonColor, ControlButtonSize, ControlButtonType } from '@controls/utils';
import { Content } from '@utils/content';
import { baseProps, withControl } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/buttons/button/button.module.css';

export interface ButtonProps extends Base {
  text: string;
  color?: ControlButtonColor;
  textSize?: ControlButtonSize;
  infoSize?: ControlButtonSize;
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
  textSize = 'md',
  infoSize = 'sm',
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
      [cn.SM]: textSize === 'sm',
      [cn.MD]: textSize === 'md',
      [cn.LG]: textSize === 'lg',
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
    {loading && (
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
        className={cn.Loader}
      />
    )}
    <FadeScale name="content" keepMount condition={!loading} className={cn.Content}>
      <span className={cn.Text}>{text}</span>
      <Content
        className={clsx(cn.Info, {
          [cn.SM]: infoSize === 'sm',
          [cn.MD]: infoSize === 'md',
          [cn.LG]: infoSize === 'lg',
        })}
      >
        {info}
      </Content>
    </FadeScale>
  </button>
);
