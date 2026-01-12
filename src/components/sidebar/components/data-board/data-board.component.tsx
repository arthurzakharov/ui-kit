import type { ReactNode } from 'react';
import { FadeScale } from '../../../animation/fade-scale/fade-scale.component';
import cn from './data-board.module.css';

export interface DataBoardProps {
  isUserOpen: boolean;
  info: ReactNode;
  user: ReactNode;
}

export const DataBoard = (props: DataBoardProps) => {
  const { isUserOpen = false, info, user } = props;

  return (
    <div className={cn.DataBoard}>
      {info}
      <FadeScale name="user" condition={isUserOpen} duration={0.2} delay={0.1}>
        {user}
      </FadeScale>
    </div>
  );
};
