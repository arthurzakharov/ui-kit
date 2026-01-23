import { type PropsWithChildren } from 'react';
import cn from '@components/text/components/page-info/page-info.module.css';

export const PageInfo = (props: PropsWithChildren) => {
  const { children } = props;

  return typeof children === 'string' ? (
    <p className={cn.PageInfo} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <p className={cn.PageInfo}>{children}</p>
  );
};
