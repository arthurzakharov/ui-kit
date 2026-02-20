import type { AnimationGeneratorType, Easing } from 'motion';
import type { BaseWithChildren } from '@utils/types';

export type InputChangeSource = 'mouse' | 'keyboard';

export interface Interactive<V> {
  id: string;
  value: V;
  disabled?: boolean;
  onChange: (value: V, id: string, source?: InputChangeSource) => void;
  onFocus?: (id: string) => void;
  onBlur?: (id: string) => void;
}

export type RadioChoice = {
  label: string;
  value: string;
  icon?: string;
};

export type ChoiceType = 'radio' | 'checkbox';

export type ChoiceValue = string | string[];

export type State = 'idle' | 'error' | 'success';

export type QuestionPath = string[];

export type QuestionChoice = {
  value: string;
  label: string;
  icon?: string;
  /**
   * - string[] - array of question keys, that defines future path;
   * - string - valid url that would be used for redirect;
   */
  path?: QuestionPath | string;
  info?: string;
  isPreselected?: boolean;
  isDefault?: boolean;
};

export type Size = {
  width: number;
  height: number;
};

export type BaseAnimationTransitionProps = {
  type?: AnimationGeneratorType;
  ease?: Easing | Easing[];
  duration?: number;
  delay?: number;
};

export type BaseAnimationProps = BaseWithChildren & {
  name: string;
  condition?: boolean;
  flex?: boolean;
  animateOnStart?: boolean;
} & BaseAnimationTransitionProps;
