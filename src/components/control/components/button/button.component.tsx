import type { ButtonProps } from '@/components/control/components/button/button.types';
import clsx from 'clsx';
import { containsHtml } from '@/components/control/utils';
import cn from '@/components/control/components/button/button.module.css';

export const Button = ({
  children,
  color,
  size,
  type,
  disabled = false,
  info = '',
  fullWidth = false,
  onClick,
  onFocus,
  onBlur,
}: ButtonProps) => (
  <button
    data-testid="button"
    type={type}
    disabled={disabled}
    className={clsx(cn.Button, {
      [cn.ButtonSizeSm]: size === 'sm',
      [cn.ButtonSizeMd]: size === 'md',
      [cn.ButtonSizeLg]: size === 'lg',
      [cn.ButtonColorNext]: color === 'next',
      [cn.ButtonColorPrevious]: color === 'previous',
      [cn.ButtonFullWidth]: fullWidth,
    })}
    onClick={() => onClick?.call(null)}
    onFocus={() => onFocus?.call(null)}
    onBlur={() => onBlur?.call(null)}
  >
    <span className={cn.ButtonText}>{children}</span>
    {containsHtml(info) && info ? (
      <span data-testid="button-info-html" className={cn.ButtonInfo} dangerouslySetInnerHTML={{ __html: info }} />
    ) : (
      <span data-testid="button-info-text" className={cn.ButtonInfo}>
        {info}
      </span>
    )}
  </button>
);
