import type { AnimationGeneratorType, Easing } from 'motion';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import cn from './fade-scale.module.css';

export interface FadeScaleProps extends PropsWithChildren {
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

export const FadeScale = (props: FadeScaleProps) => {
  const {
    children,
    name,
    condition = false,
    flex = false,
    ease = 'easeInOut',
    type = 'tween',
    className = '',
    duration = 0.15,
    delay = 0,
    animateOnStart = false,
  } = props;
  const hasRendered = useRef(animateOnStart);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (!condition) return null;

  // eslint-disable-next-line react-hooks/refs
  const initial = hasRendered.current ? { opacity: 0, scale: 0.95 } : false;

  return (
    <motion.div
      key={name}
      initial={initial}
      animate={{ opacity: 1, scale: 1 }}
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
  );
};
