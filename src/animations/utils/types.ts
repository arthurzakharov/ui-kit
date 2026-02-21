import type { AnimationGeneratorName, EasingDefinition } from 'motion';
import type { BaseWithChildren } from '@utils/types';

export type BaseAnimationProps = {
  name: string;
  condition: boolean;
  animateOnStart?: boolean;
  type?: AnimationGeneratorName;
  ease?: EasingDefinition;
  duration?: number;
  delay?: number;
} & BaseWithChildren;

export type BaseFadeAnimationProps = {
  keepMount?: boolean;
} & BaseAnimationProps;
