import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-error-message/control-error-message.module.css';
import { Content } from '@utils/content';

export const ControlErrorMessage = ({ children, ...base }: PropsWithChildren<Base>) => (
  <Content
    data-testid={baseProps(base, 'data-testid', 'control-error-message')}
    className={clsx(cn.ControlErrorMessage, baseProps(base, 'className'))}
  >
    {children}
  </Content>
);
