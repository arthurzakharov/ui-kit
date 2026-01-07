import type { PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  color: 'next' | 'previous';
  size: 'sm' | 'md' | 'lg';
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
