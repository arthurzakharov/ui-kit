import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@animations/utils/types';
import { withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-grow/animation-fade-grow.module.css';

export const AnimationFadeGrow = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);

  return (
    <AnimatePresence initial={false}>
      {defaultedProps.condition && (
        <motion.div
          key={defaultedProps.name}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            ease: defaultedProps.ease,
            duration: defaultedProps.duration,
            delay: defaultedProps.delay,
            type: defaultedProps.type,
          }}
          style={{ overflow: 'hidden' }}
          className={clsx(defaultedProps.className, defaultedProps.flex && cn.Flex)}
        >
          {defaultedProps.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
