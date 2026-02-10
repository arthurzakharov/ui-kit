import type { ReactNode } from 'react';
import type { BaseProps } from '../../utils/types';

export interface MessageProps extends BaseProps {
  type: 'success' | 'question' | 'error' | 'info';
  title: ReactNode;
  text: ReactNode;
}
