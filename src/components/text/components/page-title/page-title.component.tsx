import type { PropsWithChildren } from 'react';
import cn from './page-title.module.css';

export const PageTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <h1 className={cn.PageTitle}>{children}</h1>;
};
