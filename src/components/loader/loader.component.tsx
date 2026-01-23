import clsx from 'clsx';
import { Loader as LoaderIcon } from 'lucide-react';
import cn from '@components/loader/loader.module.css';

export interface LoaderProps {
  size?: number;
  color?: 'white' | 'primary' | 'secondary';
}

export const Loader = (props: LoaderProps) => {
  const { size = 24, color = 'white' } = props;

  return (
    <LoaderIcon
      size={size}
      className={clsx(cn.Loader, {
        [cn.LoaderColorWhite]: color === 'white',
        [cn.LoaderColorPrimary]: color === 'primary',
        [cn.LoaderColorSecondary]: color === 'secondary',
      })}
    />
  );
};
