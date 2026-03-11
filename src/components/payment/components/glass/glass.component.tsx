import type { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { Loader } from '@components/loader/loader.component';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/payment/components/glass/glass.module.css';

export interface PaymentGlassProps extends PropsWithChildren<Base> {
  on: boolean;
  withLoader?: boolean;
}

export const Glass = ({ children, on, withLoader = false, ...base }: PaymentGlassProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'payment-glass')}
    className={clsx(cn.Glass, baseProps(base, 'className'))}
  >
    <AnimatePresence mode="sync">
      {on && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.125 }}
          className={cn.Cover}
        >
          {withLoader && <Loader size="lg" color="accent-primary" />}
        </motion.div>
      )}
    </AnimatePresence>
    {children}
  </div>
);
