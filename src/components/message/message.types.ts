import type { ReactNode } from 'react';
import type { BaseProps } from '@utils/types';

type MessageType = 'success' | 'question' | 'error' | 'info';

export interface MessageProps extends BaseProps {
  type: MessageType;
  title: ReactNode;
  text: ReactNode;
}
