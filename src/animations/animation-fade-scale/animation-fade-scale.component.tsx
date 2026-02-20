import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@animations/utils/types';
import { withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-scale/animation-fade-scale.module.css';

export const AnimationFadeScale = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const hasRendered = useRef(defaultedProps.animateOnStart);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (!defaultedProps.condition) return null;

  // eslint-disable-next-line react-hooks/refs
  const initial = hasRendered.current ? { opacity: 0, scale: 0.95 } : false;

  return (
    <motion.div
      key={defaultedProps.name}
      initial={initial}
      animate={{ opacity: 1, scale: 1 }}
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
  );
};
