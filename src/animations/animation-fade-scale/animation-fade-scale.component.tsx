import { motion } from 'motion/react';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import { useAnimationLifecycle } from '@animations/hook';

export const AnimationFadeScale = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const animation = useAnimationLifecycle({
    condition: props.condition,
    animateOnStart: defaultedProps.animateOnStart,
  });

  const hiddenState = {
    opacity: 0,
    scale: 0.95,
  };
  const visibleState = { opacity: 1, scale: 1 };

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
      className={props.className}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
