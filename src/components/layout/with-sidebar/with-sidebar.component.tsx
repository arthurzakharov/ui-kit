import type { ReactNode } from 'react';
import cn from './with-sidebar.module.css';

interface WithSidebarProps {
  header: ReactNode;
  main: ReactNode;
  aside: ReactNode;
  footer: ReactNode;
}

export const WithSidebar = (props: WithSidebarProps) => {
  const { header, main, aside, footer } = props;

  return (
    <div className={cn.WithSidebar}>
      <div className={cn.WithSidebarHeader}>{header}</div>
      <div className={cn.WithSidebarContent}>
        <div className={cn.WithSidebarMain}>{main}</div>
        <div className={cn.WithSidebarAside}>{aside}</div>
      </div>
      <div className={cn.WithSidebarFooter}>{footer}</div>
    </div>
  );
};
