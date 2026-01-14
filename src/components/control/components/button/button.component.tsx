import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Animation } from '../../../animation/animation.component';
import { Loader } from '../../../loader/loader.component';
import { containsHtml } from '../../utils/utils';
import cn from './button.module.css';

export interface ButtonProps extends PropsWithChildren {
  color: 'next' | 'previous';
  size: 'sm' | 'md' | 'lg';
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    color,
    size,
    type,
    disabled = false,
    info = '',
    fullWidth = false,
    loading = false,
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
        [cn.ButtonColorNext]: color === 'next',
        [cn.ButtonColorPrevious]: color === 'previous',
        [cn.ButtonFullWidth]: fullWidth,
        [cn.ButtonLoading]: loading,
      })}
      onClick={() => onClick?.call(null)}
      onFocus={() => onFocus?.call(null)}
      onBlur={() => onBlur?.call(null)}
    >
      <div className={cn.ButtonLoaderWrap}>
        <Animation.FadeScale
          name="loader"
          condition={loading}
          duration={0.2}
          delay={0.2}
          className={cn.ButtonLoaderAnimationWrap}
        >
          <Loader size={24} color="white" />
        </Animation.FadeScale>
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
