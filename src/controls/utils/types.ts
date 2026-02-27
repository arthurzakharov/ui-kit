import type { FontSize, FontColor } from '@utils/types';

export type InputChangeSource = 'mouse' | 'keyboard';

export type Interactive<V> = {
  id: string;
  value: V;
  disabled?: boolean;
  onChange: (value: V, id: string, source?: InputChangeSource) => void;
  onFocus?: (id: string) => void;
  onBlur?: (id: string) => void;
};

export type RadioChoice = {
  label: string;
  value: string;
  icon?: string;
};

export type ControlChoiceType = 'radio' | 'checkbox';

export type ChoiceValue = string | string[];

export type State = 'idle' | 'error' | 'success';

export type ControlLabelPosition = 'idle' | 'active';

export type ControlRadioTextSize = Extract<FontSize, 'body-extra-small' | 'body-small' | 'body' | 'body-large'>;

export type ControlRadioTextColor = Extract<
  FontColor,
  'text-primary' | 'text-secondary' | 'accent-primary' | 'accent-secondary'
>;

export type ControlButtonColor = 'primary' | 'secondary' | 'tertiary';

export type ControlButtonTypeColor = Extract<
  FontColor,
  'text-primary' | 'text-secondary' | 'accent-primary' | 'accent-secondary' | 'theme-primary' | 'theme-secondary'
>;

export type ControlButtonSize = 'sm' | 'md' | 'lg';

export type ControlButtonType = 'submit' | 'reset' | 'button';

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
