import type { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader } from '@components/loader/loader.component';
import cn from '@components/payment/components/glass/glass.module.css';

export interface PaymentGlassProps extends PropsWithChildren {
  on: boolean;
  withLoader?: boolean;
}

export const Glass = (props: PaymentGlassProps) => {
  const { children, on, withLoader = false } = props;
  return (
    <div className={cn.Glass}>
      <AnimatePresence mode="sync">
        {on && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.125 }}
            className={cn.Cover}
          >
            {withLoader && <Loader size="lg" color="primary" />}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
