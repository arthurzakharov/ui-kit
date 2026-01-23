import type { PropsWithChildren } from 'react';
import cn from '@components/text/components/step-title/step-title.module.css';

export const StepTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return typeof children === 'string' ? (
    <h2 className={cn.StepTitle} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <h2 className={cn.StepTitle}>{children}</h2>
  );
};
