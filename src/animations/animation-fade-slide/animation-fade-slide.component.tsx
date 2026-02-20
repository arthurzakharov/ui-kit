import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@animations/utils/types';
import { withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-slide/animation-fade-slide.module.css';

type AnimationFadeSlideProps = BaseAnimationProps & {
  direction?: 'ltr' | 'rtl';
};

export const AnimationFadeSlide = (props: AnimationFadeSlideProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);

  const slideInitialState = {
    x: (defaultedProps.direction ?? 'ltr') === 'ltr' ? '-100%' : '100%',
    opacity: 0,
  };

  return (
    <AnimatePresence initial={false}>
      {defaultedProps.condition && (
        <motion.div
          key={defaultedProps.name}
          initial={slideInitialState}
          animate={{ x: 0, opacity: 1 }}
          exit={slideInitialState}
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
