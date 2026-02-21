import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/animation-fade-slide/animation-fade-slide.module.css';

type AnimationFadeSlideProps = BaseAnimationProps & {
  direction?: 'ltr' | 'rtl';
};

export const AnimationFadeSlide = (props: AnimationFadeSlideProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const hasRendered = useRef(defaultedProps.animateOnStart);
  const conditionRef = useRef(defaultedProps.condition);
  const [shouldRender, setShouldRender] = useState(
    defaultedProps.condition || defaultedProps.animateOnStart,
  );
  conditionRef.current = defaultedProps.condition;

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  useEffect(() => {
    if (defaultedProps.condition) {
      setShouldRender(true);
    }
  }, [defaultedProps.condition]);

  const hiddenState = {
    x: (defaultedProps.direction ?? 'ltr') === 'ltr' ? '-100%' : '100%',
    opacity: 0,
  };
  const visibleState = { x: 0, opacity: 1 };

  const initial = hasRendered.current
    ? defaultedProps.condition
      ? hiddenState
      : visibleState
    : false;

  if (!shouldRender) return null;

  return (
    <motion.div
      key={defaultedProps.name}
      initial={initial}
      animate={defaultedProps.condition ? visibleState : hiddenState}
      transition={{
        ease: defaultedProps.ease,
        duration: defaultedProps.duration,
        delay: defaultedProps.delay,
        type: defaultedProps.type,
      }}
      onAnimationComplete={() => {
        if (!conditionRef.current) {
          setShouldRender(false);
        }
      }}
      className={clsx(defaultedProps.className, defaultedProps.flex && cn.Flex)}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
