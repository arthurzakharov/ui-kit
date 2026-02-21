import type { BaseAnimationProps } from '@animations/utils/types';

type BaseAnimationDefaultKeys = 'animateOnStart' | 'ease' | 'type' | 'duration' | 'delay';

type BaseAnimationDefaults = Required<Pick<BaseAnimationProps, BaseAnimationDefaultKeys>>;

const BASE_ANIMATION_DEFAULT_PROPS: BaseAnimationDefaults = {
  animateOnStart: false,
  ease: 'easeInOut',
  type: 'tween',
  duration: 0.2,
  delay: 0,
};

export const withBaseAnimationDefaults = <T extends BaseAnimationProps>(props: T): T & BaseAnimationDefaults => ({
  ...props,
  animateOnStart: props.animateOnStart ?? BASE_ANIMATION_DEFAULT_PROPS.animateOnStart,
  ease: props.ease ?? BASE_ANIMATION_DEFAULT_PROPS.ease,
  type: props.type ?? BASE_ANIMATION_DEFAULT_PROPS.type,
  duration: props.duration ?? BASE_ANIMATION_DEFAULT_PROPS.duration,
  delay: props.delay ?? BASE_ANIMATION_DEFAULT_PROPS.delay,
});
