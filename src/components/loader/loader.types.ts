import type { BaseProps } from '../../utils/types';

export interface LoaderProps extends BaseProps {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  color: 'white' | 'primary' | 'secondary';
}
