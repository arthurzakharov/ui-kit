import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonColor = 'next' | 'previous';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>['type'];

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
