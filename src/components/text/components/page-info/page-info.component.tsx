import type { PropsWithChildren } from 'react';
import cn from './page-info.module.css';

export const PageInfo = (props: PropsWithChildren) => {
  const { children } = props;

  return <p className={cn.PageInfo}>{children}</p>;
};
