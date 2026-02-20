import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@utils/types';
import cn from '@animations/animation-rotate/animation-rotate.module.css';

type RotateDirection = 'top' | 'left' | 'bottom' | 'right';

type AnimationRotateProps = BaseAnimationProps & {
  from?: RotateDirection;
  to?: RotateDirection;
};

const DEGREE_BY_DIRECTION: Record<RotateDirection, number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export const AnimationRotate = (props: AnimationRotateProps) => {
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
    duration = 0.2,
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
      className={clsx(className, flex && cn.Flex)}
    >
      {children}
    </motion.div>
  );
};
