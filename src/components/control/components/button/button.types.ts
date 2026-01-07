import type { PropsWithChildren } from 'react';

type ButtonColor = 'next' | 'previous';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonType = 'submit' | 'reset' | 'button';

export interface ButtonProps extends PropsWithChildren {
  color: ButtonColor;
  size: ButtonSize;
  type: ButtonType;
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
