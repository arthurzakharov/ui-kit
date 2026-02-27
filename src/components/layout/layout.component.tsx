import type { ReactNode } from 'react';
import clsx from 'clsx';
import cn from '@components/layout/layout.module.css';

export interface LayoutProps {
  sidebarAlwaysVisible?: boolean;
  header: ReactNode;
  main: ReactNode;
  aside?: ReactNode;
  footer: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { sidebarAlwaysVisible = false, header, main, aside, footer } = props;

  return (
    <div
      className={clsx(cn.Layout, {
        [cn.LayoutWithSidebarOnBigScreens]: aside && !sidebarAlwaysVisible,
        [cn.LayoutWithSidebarOnAllScreens]: aside && sidebarAlwaysVisible,
        [cn.LayoutWithoutSidebar]: !aside,
      })}
    >
      <div className={cn.LayoutHeader}>{header}</div>
      <div className={cn.LayoutContent}>
        <div className={cn.LayoutMain}>{main}</div>
        {aside ? <div className={cn.LayoutAside}>{aside}</div> : null}
      </div>
      <div className={cn.LayoutFooter}>{footer}</div>
    </div>
  );
};
