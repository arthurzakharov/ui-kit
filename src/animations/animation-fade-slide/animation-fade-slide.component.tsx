import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@animations/utils/types';
import { withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-slide/animation-fade-slide.module.css';

type AnimationFadeSlideProps = BaseAnimationProps & {
  direction?: 'ltr' | 'rtl';
};

export const AnimationFadeSlide = (props: AnimationFadeSlideProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const hasRendered = useRef(defaultedProps.animateOnStart);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (!defaultedProps.condition) return null;

  // eslint-disable-next-line react-hooks/refs
  const initial = hasRendered.current
    ? { x: (defaultedProps.direction ?? 'ltr') === 'ltr' ? '-100%' : '100%', opacity: 0 }
    : false;

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        key={defaultedProps.name}
        initial={initial}
        animate={{ x: 0, opacity: 1 }}
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
    </div>
  );
};
