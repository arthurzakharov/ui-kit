import type { FocusEvent, MouseEvent } from 'react';
import clsx from 'clsx';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { Loader } from '@components/loader/loader.component';
import { Content } from '@utils/content';
import type { BaseWithChildren } from '@utils/types';
import cn from '@controls/control-button/control-button.module.css';
import { withControl } from '@utils/functions';

export type ControlButtonProps = {
  color: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  loading?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
} & BaseWithChildren;

export const ControlButton = (props: ControlButtonProps) => {
  const {
    children,
    color,
    size = 'md',
    type = 'button',
    disabled = false,
    info = '',
    fullWidth = false,
    loading = false,
    preventDefault = false,
    blurAfterClick = false,
    onClick = () => {},
    onFocus = () => {},
    onBlur = () => {},
    className,
  } = props;

  return (
    <button
      data-testid="button"
      type={type}
      disabled={disabled || loading}
      className={clsx(cn.Button, className, {
        [cn.SizeSm]: size === 'sm',
        [cn.SizeMd]: size === 'md',
        [cn.SizeLg]: size === 'lg',
        [cn.ColorPrimary]: color === 'primary',
        [cn.ColorSecondary]: color === 'secondary',
        [cn.ColorTertiary]: color === 'tertiary',
        [cn.FullWidth]: fullWidth,
        [cn.Loading]: loading,
      })}
      onClick={withControl(onClick, { prevent: preventDefault, blur: blurAfterClick })}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <AnimationFadeScale name="loader" condition={loading} className={cn.LoaderAnimation}>
        <Loader size="xs" color="white" />
      </AnimationFadeScale>
      <div data-loading={loading} className={cn.Content}>
        <span className={cn.Text}>{children}</span>
        <Content className={cn.Info}>{info}</Content>
      </div>
    </button>
  );
};
