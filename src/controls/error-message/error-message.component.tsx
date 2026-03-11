import clsx from 'clsx';
import { Content } from '@utils/content';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/error-message/error-message.module.css';

export interface ErrorMessageProps extends Base {
  text: string;
}

export const ErrorMessage = ({
  // ErrorMessage props
  text,
  // Base props
  ...base
}: ErrorMessageProps) => (
  <Content
    data-testid={baseProps(base, 'data-testid', 'error-message')}
    className={clsx(cn.ErrorMessage, baseProps(base, 'className'))}
  >
    {text}
  </Content>
);
