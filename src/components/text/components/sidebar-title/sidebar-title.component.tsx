import type { PropsWithChildren } from 'react';
import cn from '@components/text/components/sidebar-title/sidebar-title.module.css';

export const SidebarTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return typeof children === 'string' ? (
    <h3 className={cn.SidebarTitle} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <h3 className={cn.SidebarTitle}>{children}</h3>
  );
};
