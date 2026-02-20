import type { PropsWithChildren, MouseEvent } from 'react';
import clsx from 'clsx';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { Loader } from '@components/loader/loader.component';
import { containsHtml } from '@controls/utils/functions';
import cn from '@controls/control-button/control-button.module.css';

export interface ControlButtonProps extends PropsWithChildren {
  color: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  loading?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

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
    onClick,
    onFocus,
    onBlur,
  } = props;

  return (
    <button
      data-testid="button"
      type={type}
      disabled={disabled || loading}
      className={clsx(cn.Button, {
        [cn.ButtonSizeSm]: size === 'sm',
        [cn.ButtonSizeMd]: size === 'md',
        [cn.ButtonSizeLg]: size === 'lg',
        [cn.ButtonColorPrimary]: color === 'primary',
        [cn.ButtonColorSecondary]: color === 'secondary',
        [cn.ButtonColorTertiary]: color === 'tertiary',
        [cn.ButtonFullWidth]: fullWidth,
        [cn.ButtonLoading]: loading,
      })}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        if (preventDefault) e.preventDefault();
        if (blurAfterClick) e.currentTarget.blur();
        onClick?.call(null);
      }}
      onFocus={() => onFocus?.call(null)}
      onBlur={() => onBlur?.call(null)}
    >
      <div className={cn.ButtonLoaderWrap}>
        <AnimationFadeScale
          name="loader"
          condition={loading}
          duration={0.2}
          delay={0.2}
          className={cn.ButtonLoaderAnimationWrap}
        >
          <Loader size="xs" color="white" />
        </AnimationFadeScale>
      </div>
      <div className={clsx(cn.ButtonContent, loading ? cn.ButtonContentLoading : cn.ButtonContentIdle)}>
        <span className={cn.ButtonText}>{children}</span>
        {containsHtml(info) && info ? (
          <span className={cn.ButtonInfo} dangerouslySetInnerHTML={{ __html: info }} />
        ) : (
          <span className={cn.ButtonInfo}>{info}</span>
        )}
      </div>
    </button>
  );
};
