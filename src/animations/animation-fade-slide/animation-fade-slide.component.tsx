import { motion } from 'motion/react';
import { type BaseFadeAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import { useAnimationLifecycle } from '@animations/hook';

interface AnimationFadeSlideProps extends BaseFadeAnimationProps {
  direction?: 'ltr' | 'rtl';
}

export const AnimationFadeSlide = (props: AnimationFadeSlideProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const animation = useAnimationLifecycle({
    condition: defaultedProps.condition,
    animateOnStart: defaultedProps.animateOnStart,
  });

  const hiddenState = {
    x: (defaultedProps.direction ?? 'ltr') === 'ltr' ? '-100%' : '100%',
    opacity: 0,
  };
  const visibleState = { x: 0, opacity: 1 };

  if (!animation.shouldRender && !defaultedProps.keepMount) return null;

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
      className={defaultedProps.className}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
