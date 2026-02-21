import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { type BaseAnimationProps, withBaseAnimationDefaults } from '@animations/utils';
import cn from '@animations/styles/animation.module.css';

export const AnimationFadeScale = (props: BaseAnimationProps) => {
  const defaultedProps = withBaseAnimationDefaults(props);
  const hasRendered = useRef(defaultedProps.animateOnStart);
  const conditionRef = useRef(defaultedProps.condition);
  const [shouldRender, setShouldRender] = useState(defaultedProps.condition || defaultedProps.animateOnStart);
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
    opacity: 0,
    scale: 0.95,
  };
  const visibleState = { opacity: 1, scale: 1 };

  const initial = hasRendered.current ? (defaultedProps.condition ? hiddenState : visibleState) : false;

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
      className={clsx(defaultedProps.className, defaultedProps.flex && cn.Flex, defaultedProps.absolute && cn.Absolute)}
    >
      {defaultedProps.children}
    </motion.div>
  );
};
