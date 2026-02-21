import type { BaseAnimationProps } from '@animations/utils/types';

type BaseAnimationDefaultKeys =
  | 'condition'
  | 'flex'
  | 'absolute'
  | 'ease'
  | 'type'
  | 'className'
  | 'duration'
  | 'delay'
  | 'animateOnStart';

type BaseAnimationDefaults = Required<Pick<BaseAnimationProps, BaseAnimationDefaultKeys>>;

export const BASE_ANIMATION_DEFAULT_PROPS: BaseAnimationDefaults = {
  condition: false,
  flex: false,
  absolute: false,
  ease: 'easeInOut',
  type: 'tween',
  className: '',
  duration: 0.2,
  delay: 0,
  animateOnStart: false,
};

export const withBaseAnimationDefaults = <T extends BaseAnimationProps>(props: T): T & BaseAnimationDefaults => ({
  ...props,
  condition: props.condition ?? BASE_ANIMATION_DEFAULT_PROPS.condition,
  flex: props.flex ?? BASE_ANIMATION_DEFAULT_PROPS.flex,
  absolute: props.absolute ?? BASE_ANIMATION_DEFAULT_PROPS.absolute,
  ease: props.ease ?? BASE_ANIMATION_DEFAULT_PROPS.ease,
  type: props.type ?? BASE_ANIMATION_DEFAULT_PROPS.type,
  className: props.className ?? BASE_ANIMATION_DEFAULT_PROPS.className,
  duration: props.duration ?? BASE_ANIMATION_DEFAULT_PROPS.duration,
  delay: props.delay ?? BASE_ANIMATION_DEFAULT_PROPS.delay,
  animateOnStart: props.animateOnStart ?? BASE_ANIMATION_DEFAULT_PROPS.animateOnStart,
});
