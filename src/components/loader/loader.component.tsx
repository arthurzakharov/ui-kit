import clsx from 'clsx';
import { Loader as LoaderIcon } from 'lucide-react';
import type { Base, Size } from '@utils/types';
import cn from '@components/loader/loader.module.css';

type LoaderColor = 'white' | 'primary' | 'secondary';

export interface LoaderProps extends Base {
  size: Size;
  color: LoaderColor;
  padding?: Size;
}

export const Loader = ({ size, color, padding, className = '' }: LoaderProps) => (
  <div
    data-testid="loader"
    className={clsx(cn.Loader, className, {
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
      size={(() => {
        switch (size) {
          case 'xxs':
            return 16;
          case 'xs':
            return 24;
          case 'sm':
            return 32;
          case 'md':
            return 40;
          case 'lg':
            return 48;
          case 'xl':
            return 56;
          case 'xxl':
            return 64;
          case 'xxxl':
            return 72;
        }
      })()}
      className={clsx(cn.Icon, {
        [cn.White]: color === 'white',
        [cn.Primary]: color === 'primary',
        [cn.Secondary]: color === 'secondary',
      })}
    />{' '}
  </div>
);
