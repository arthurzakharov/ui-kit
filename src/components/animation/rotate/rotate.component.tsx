import type { AnimationGeneratorType, Easing } from 'motion';
import { type PropsWithChildren } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import cn from '@components/animation/rotate/rotate.module.css';

type RotateDirection = 'top' | 'left' | 'bottom' | 'right';

const DEGREE_BY_DIRECTION: Record<RotateDirection, number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export interface RotateProps extends PropsWithChildren {
  name: string;
  condition?: boolean;
  flex?: boolean;
  from?: RotateDirection;
  to?: RotateDirection;
  className?: string;
  type?: AnimationGeneratorType;
  ease?: Easing | Easing[];
  duration?: number;
  delay?: number;
  animateOnStart?: boolean;
}

export const Rotate = (props: RotateProps) => {
  const {
    children,
    name,
    condition = false,
    flex = false,
    from = 'left',
    to = 'top',
    ease = 'easeInOut',
    type = 'tween',
    className = '',
    duration = 0.15,
    delay = 0,
    animateOnStart = false,
  } = props;

  const fromRotate = `${DEGREE_BY_DIRECTION[from]}deg`;
  const toRotate = `${DEGREE_BY_DIRECTION[to]}deg`;
  const initial = animateOnStart ? { rotate: fromRotate } : false;

  return (
    <motion.div
      key={name}
      initial={initial}
      animate={{ rotate: condition ? toRotate : fromRotate }}
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
