import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-scale/animation-fade-scale.module.css';

export const AnimationFadeScale = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);

  const scaleInitialState = {
    opacity: 0,
    scale: 0.95,
  };

  return (
    <AnimatePresence initial={false}>
      {defaultedProps.condition && (
        <motion.div
          key={defaultedProps.name}
          initial={scaleInitialState}
          animate={{ opacity: 1, scale: 1 }}
          exit={scaleInitialState}
          transition={{
            ease: defaultedProps.ease,
            duration: defaultedProps.duration,
            delay: defaultedProps.delay,
            type: defaultedProps.type,
          }}
          className={clsx(defaultedProps.className, defaultedProps.flex && cn.Flex)}
        >
          {defaultedProps.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
