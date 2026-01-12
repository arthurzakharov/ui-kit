import type { PropsWithChildren } from 'react';
import cn from './page-title.module.css';

export const PageTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return typeof children === 'string' ? (
    <h1 className={cn.PageTitle} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <h1 className={cn.PageTitle}>{children}</h1>
  );
};
