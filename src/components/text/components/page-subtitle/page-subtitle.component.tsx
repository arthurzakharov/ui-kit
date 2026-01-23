import type { PropsWithChildren } from 'react';
import cn from '@components/text/components/page-subtitle/page-subtitle.module.css';

export const PageSubtitle = (props: PropsWithChildren) => {
  const { children } = props;

  return typeof children === 'string' ? (
    <h6 className={cn.PageSubtitle} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <h6 className={cn.PageSubtitle}>{children}</h6>
  );
};
