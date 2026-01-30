import type { PropsWithChildren } from 'react';
import cn from '@components/payment/components/block/block.module.css';

export interface PaymentBlockProps extends PropsWithChildren {
  title: string;
}

export const Block = (props: PaymentBlockProps) => {
  const { children, title } = props;

  return (
    <div className={cn.Block}>
      <h6 className={cn.BlockTitle} dangerouslySetInnerHTML={{ __html: title }} />
      {children}
    </div>
  );
};
