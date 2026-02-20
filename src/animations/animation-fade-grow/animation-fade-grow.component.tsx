import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@controls/utils/types';
import cn from '@animations/animation-fade-grow/animation-fade-grow.module.css';

export const AnimationFadeGrow = (props: BaseAnimationProps) => {
  const {
    children,
    name,
    condition = false,
    flex = false,
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
  const initial = hasRendered.current ? { height: 0, opacity: 0 } : false;

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        key={name}
        initial={initial}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ ease, duration, delay, type }}
        className={
          className || flex
            ? clsx(className, {
                [cn.Flex]: flex,
              })
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
