import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@utils/types';
import cn from '@animations/animation-fade-slide/animation-fade-slide.module.css';

type AnimationFadeSlideProps = BaseAnimationProps & {
  direction?: 'ltr' | 'rtl';
};

export const AnimationFadeSlide = (props: AnimationFadeSlideProps) => {
  const {
    children,
    name,
    condition = false,
    flex = false,
    direction = 'ltr',
    ease = 'easeInOut',
    type = 'tween',
    className = '',
    duration = 0.2,
    delay = 0,
    animateOnStart = false,
  } = props;
  const hasRendered = useRef(animateOnStart);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (!condition) return null;

  // eslint-disable-next-line react-hooks/refs
  const initial = hasRendered.current ? { x: direction === 'ltr' ? '-100%' : '100%', opacity: 0 } : false;

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        key={name}
        initial={initial}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease, duration, delay, type }}
        className={clsx(className, flex && cn.Flex)}
      >
        {children}
      </motion.div>
    </div>
  );
};
