import type { PropsWithChildren } from 'react';
import cn from './sidebar-title.module.css';

export const SidebarTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <h3 className={cn.SidebarTitle}>{children}</h3>;
};
