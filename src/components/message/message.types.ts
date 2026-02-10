import type { BaseProps } from '@utils/types';
import type { ReactNode } from 'react';

type MessageType = 'success' | 'question' | 'error' | 'info';

export interface MessageProps extends BaseProps {
  type: MessageType;
  title: ReactNode;
  text: ReactNode;
}
