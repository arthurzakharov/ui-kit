import { useEffect, useRef, useState } from 'react';

type UseAnimationLifecycleOptions = {
  condition: boolean;
  animateOnStart: boolean;
};

type AnimationState<T, U> = T | U | false;

export const useAnimationLifecycle = ({ condition, animateOnStart }: UseAnimationLifecycleOptions) => {
  const [isReady, setIsReady] = useState(animateOnStart);
  const [shouldRender, setShouldRender] = useState(condition || animateOnStart);
  const conditionRef = useRef(condition);

  useEffect(() => {
    conditionRef.current = condition;
  }, [condition]);

  useEffect(() => {
    if (!isReady) {
      const frameId = requestAnimationFrame(() => {
        setIsReady(true);
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [isReady]);

  useEffect(() => {
    if (condition && !shouldRender) {
      const frameId = requestAnimationFrame(() => {
        setShouldRender(true);
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [condition, shouldRender]);

  const getInitialState = <T, U>(hiddenState: T, visibleState: U): AnimationState<T, U> =>
    isReady ? (condition ? hiddenState : visibleState) : false;

  const getAnimateState = <T, U>(hiddenState: T, visibleState: U): T | U => (condition ? visibleState : hiddenState);

  const onAnimationComplete = () => {
    if (!conditionRef.current) {
      setShouldRender(false);
    }
  };

  return {
    shouldRender,
    getInitialState,
    getAnimateState,
    onAnimationComplete,
  };
};
