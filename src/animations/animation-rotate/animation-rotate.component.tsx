import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';

type RotateDirection = 'top' | 'left' | 'bottom' | 'right';

interface AnimationRotateProps extends BaseAnimationProps {
  from?: RotateDirection;
  to?: RotateDirection;
}

const DEGREE_BY_DIRECTION: Record<RotateDirection, number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export const AnimationRotate = (props: AnimationRotateProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const prevConditionRef = useRef(defaultedProps.condition);
  const [isActivated, setIsActivated] = useState(defaultedProps.animateOnStart);

  const fromRotate = `${DEGREE_BY_DIRECTION[defaultedProps.from ?? 'left']}deg`;
  const toRotate = `${DEGREE_BY_DIRECTION[defaultedProps.to ?? 'top']}deg`;
  const effectiveCondition = isActivated ? defaultedProps.condition : false;
  const animateRotate = effectiveCondition ? toRotate : fromRotate;

  useEffect(() => {
    if (prevConditionRef.current !== defaultedProps.condition) {
      prevConditionRef.current = defaultedProps.condition;

      if (!isActivated) {
        const frameId = requestAnimationFrame(() => {
          setIsActivated(true);
        });

        return () => cancelAnimationFrame(frameId);
      }
    }
  }, [defaultedProps.condition, isActivated]);

  return (
    <motion.div
      data-testid={defaultedProps['data-testid'] || 'animation-rotate'}
      key={defaultedProps.name}
      initial={{ rotate: fromRotate }}
      animate={{ rotate: animateRotate }}
      transition={{
        ease: defaultedProps.ease,
        duration: defaultedProps.duration,
        delay: defaultedProps.delay,
        type: defaultedProps.type,
      }}
      className={defaultedProps.className}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
