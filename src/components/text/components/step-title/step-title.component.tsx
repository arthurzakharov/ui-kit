import type { PropsWithChildren } from 'react';
import cn from './step-title.module.css';

export const StepTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <h2 className={cn.StepTitle}>{children}</h2>;
};
