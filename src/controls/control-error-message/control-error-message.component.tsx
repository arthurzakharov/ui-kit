import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-error-message/control-error-message.module.css';

/**
 * `ControlErrorMessage` renders validation feedback text in an error style. Use it below a control to
 * communicate required fields, invalid input, or any form-level validation issue.
 */
export const ControlErrorMessage = ({ children, ...base }: PropsWithChildren<Base>) => (
  <span
    data-testid={baseProps(base, 'data-testid', 'control-error-message')}
    className={clsx(cn.ControlErrorMessage, baseProps(base, 'className'))}
  >
    {children}
  </span>
);
