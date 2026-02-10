import clsx from 'clsx';
import { Loader as LoaderIcon } from 'lucide-react';
import type { BaseProps, Size } from '@utils/types';
import cn from '@components/loader/loader.module.css';

type LoaderColor = 'white' | 'primary' | 'secondary';

export interface LoaderProps extends BaseProps {
  size: Size;
  color: LoaderColor;
}

export const Loader = ({ size, color, className = '' }: LoaderProps) => (
  <LoaderIcon
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
    className={clsx(cn.Loader, className, {
      [cn.White]: color === 'white',
      [cn.Primary]: color === 'primary',
      [cn.Secondary]: color === 'secondary',
    })}
  />
);
