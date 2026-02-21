import clsx from 'clsx';
import type { BaseWithChildren } from '@utils/types';
import cn from '@controls/control-error-message/control-error-message.module.css';

export type ControlErrorMessageProps = BaseWithChildren;

export const ControlErrorMessage = ({ children, className = '' }: ControlErrorMessageProps) => (
  <span className={clsx(cn.ErrorMessage, className)}>{children}</span>
);
