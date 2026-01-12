import type { PropsWithChildren } from 'react';
import cn from './board.module.css';

export const Board = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={cn.Board}>{children}</div>;
};
