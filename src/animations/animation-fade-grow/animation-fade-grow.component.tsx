import { motion } from 'motion/react';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import { useAnimationLifecycle } from '@animations/hook';

export const AnimationFadeGrow = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const animation = useAnimationLifecycle({
    condition: defaultedProps.condition,
    animateOnStart: defaultedProps.animateOnStart,
  });

  const hiddenState = {
    height: 0,
    opacity: 0,
  };
  const visibleState = { height: 'auto', opacity: 1 };

  if (!animation.shouldRender) return null;

  return (
    <motion.div
      key={defaultedProps.name}
      initial={animation.getInitialState(hiddenState, visibleState)}
      animate={animation.getAnimateState(hiddenState, visibleState)}
      transition={{
        ease: defaultedProps.ease,
        duration: defaultedProps.duration,
        delay: defaultedProps.delay,
        type: defaultedProps.type,
      }}
      onAnimationComplete={animation.onAnimationComplete}
      style={{ overflow: 'hidden' }}
      className={defaultedProps.className}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
