import type { AnimationGeneratorName, EasingDefinition } from 'motion';
import type { PropsWithChildren } from 'react';

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type Base = {
  className?: string;
};

export type BaseWithChildren = Base & PropsWithChildren;

export type BaseAnimationProps = {
  type?: AnimationGeneratorName;
  ease?: EasingDefinition;
  duration?: number;
  delay?: number;
  name: string;
  condition?: boolean;
  flex?: boolean;
  animateOnStart?: boolean;
} & BaseWithChildren;
