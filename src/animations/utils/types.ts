import type { PropsWithChildren } from 'react';
import type { AnimationGeneratorName, EasingDefinition } from 'motion';
import type { Base } from '@utils/types';

export interface BaseAnimationProps extends PropsWithChildren<Base> {
  name: string;
  condition: boolean;
  animateOnStart?: boolean;
  type?: AnimationGeneratorName;
  ease?: EasingDefinition;
  duration?: number;
  delay?: number;
  onAnimationEnd?: (condition: boolean) => void;
}

export interface BaseFadeAnimationProps extends BaseAnimationProps {
  keepMount?: boolean;
}
