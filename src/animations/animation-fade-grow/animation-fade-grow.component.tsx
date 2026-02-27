import clsx from 'clsx';
import { motion } from 'motion/react';
import { type BaseFadeAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import { useAnimationLifecycle } from '@animations/hook';
import cn from '@animations/styles/animation.module.css';

export const AnimationFadeGrow = (props: BaseFadeAnimationProps) => {
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

  if (!animation.shouldRender && !defaultedProps.keepMount) return null;

  return (
    <div
      data-testid={defaultedProps['data-testid'] || 'animation-fade-grow'}
      className={clsx(cn.Animation, defaultedProps.className)}
    >
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
      >
        {defaultedProps.children}
      </motion.div>
    </div>
  );
};
