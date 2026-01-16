import type { AnimationGeneratorType, Easing } from 'motion';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import cn from './fade-slide.module.css';

export interface FadeSlideProps extends PropsWithChildren {
  name: string;
  condition: boolean;
  flex?: boolean;
  direction?: 'ltr' | 'rtl';
  className?: string;
  type?: AnimationGeneratorType;
  ease?: Easing | Easing[];
  duration?: number;
  delay?: number;
  animateOnStart?: boolean;
}

export const FadeSlide = (props: FadeSlideProps) => {
  const {
    children,
    name,
    condition,
    flex = false,
    direction = 'ltr',
    ease = 'easeInOut',
    type = 'tween',
    className = '',
    duration = 0.125,
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
