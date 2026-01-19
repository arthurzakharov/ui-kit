import type { PropsWithChildren } from 'react';
import cn from './block.module.css';

export interface BlockProps extends PropsWithChildren {
  title: string;
}

export const Block = (props: BlockProps) => {
  const { children, title } = props;

  return (
    <div className={cn.Block}>
      <h6 className={cn.BlockTitle} dangerouslySetInnerHTML={{ __html: title }} />
      {children}
    </div>
  );
};
