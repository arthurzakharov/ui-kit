import type { AnimationGeneratorType, Easing } from 'motion';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import cn from '@animations/animation-fade-grow/animation-fade-grow.module.css';

export interface AnimationFadeGrowProps extends PropsWithChildren {
  name: string;
  condition?: boolean;
  flex?: boolean;
  className?: string;
  type?: AnimationGeneratorType;
  ease?: Easing | Easing[];
  duration?: number;
  delay?: number;
  animateOnStart?: boolean;
}

export const AnimationFadeGrow = (props: AnimationFadeGrowProps) => {
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
