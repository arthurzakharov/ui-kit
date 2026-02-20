import { motion } from 'motion/react';
import clsx from 'clsx';
import type { BaseAnimationProps } from '@animations/utils/types';
import { withBaseAnimationDefaults } from '@animations/utils';
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
  const defaultedProps = withBaseAnimationDefaults(props);

  const fromRotate = `${DEGREE_BY_DIRECTION[defaultedProps.from ?? 'left']}deg`;
  const toRotate = `${DEGREE_BY_DIRECTION[defaultedProps.to ?? 'top']}deg`;

  return (
    <motion.div
      key={defaultedProps.name}
      initial={defaultedProps.animateOnStart && { rotate: fromRotate }}
      animate={{ rotate: defaultedProps.condition ? toRotate : fromRotate }}
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
