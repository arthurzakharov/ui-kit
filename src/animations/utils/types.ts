import type { AnimationGeneratorName, EasingDefinition } from 'motion';
import type { BaseWithChildren } from '@utils/types';

export type BaseAnimationProps = {
  type?: AnimationGeneratorName;
  ease?: EasingDefinition;
  duration?: number;
  delay?: number;
  name: string;
  condition?: boolean;
  animateOnStart?: boolean;
} & BaseWithChildren;
