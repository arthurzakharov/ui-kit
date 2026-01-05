import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonColor = 'next' | 'previous';

type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends PropsWithChildren {
  color: ButtonColor;
  size: ButtonSize;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  info?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
