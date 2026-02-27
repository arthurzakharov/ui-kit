import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@components/sidebar/components/board/board.module.css';

export const Board = ({ children, ...base }: PropsWithChildren<Base>) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'sidebar-board')}
    className={clsx(cn.Board, baseProps(base, 'className'))}
  >
    {children}
  </div>
);
