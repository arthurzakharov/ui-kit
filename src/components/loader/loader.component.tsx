import clsx from 'clsx';
import { Loader as LoaderIcon } from 'lucide-react';
import type { Base, FontColor, Size } from '@utils/types';
import { baseProps } from '@utils/functions';
import { getLoaderSize } from '@components/loader/loader.utils';
import cn from '@components/loader/loader.module.css';

type LoaderColor =
  | 'white'
  | Extract<FontColor, 'text-primary' | 'text-secondary' | 'accent-primary' | 'accent-secondary'>;

export interface LoaderProps extends Base {
  color: LoaderColor;
  size: Size;
  padding?: Size;
}

/**
 * `Loader` renders a spinning icon and supports multiple sizes and colors. Use `padding` when
 * the loader needs extra breathing room inside a container.
 */
export const Loader = ({ color, size, padding, ...base }: LoaderProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'loader')}
    className={clsx(cn.Loader, baseProps(base, 'className'), {
      [cn.Padding]: !!padding,
      [cn.XXS]: padding === 'xxs',
      [cn.XS]: padding === 'xs',
      [cn.SM]: padding === 'sm',
      [cn.MD]: padding === 'md',
      [cn.LG]: padding === 'lg',
      [cn.XL]: padding === 'xl',
      [cn.XXL]: padding === 'xxl',
      [cn.XXXL]: padding === 'xxxl',
    })}
  >
    <LoaderIcon
      data-testid="loader-icon"
      size={getLoaderSize(size)}
      className={clsx(cn.Icon, {
        [cn.White]: color === 'white',
        [cn.TextPrimary]: color === 'text-primary',
        [cn.TextSecondary]: color === 'text-secondary',
        [cn.AccentPrimary]: color === 'accent-primary',
        [cn.AccentSecondary]: color === 'accent-secondary',
      })}
    />{' '}
  </div>
);
