import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { Base } from '@utils/types';
import cn from '@controls/control-error-message/control-error-message.module.css';

export interface ControlErrorMessageProps extends Base, PropsWithChildren {}

export const ControlErrorMessage = ({ children, className = '' }: ControlErrorMessageProps) => (
  <span className={clsx(cn.ErrorMessage, className)}>{children}</span>
);
