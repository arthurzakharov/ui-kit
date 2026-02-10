import type { BaseProps, Size } from '@utils/types';

type LoaderColor = 'white' | 'primary' | 'secondary';

export interface LoaderProps extends BaseProps {
  size: Size;
  color: LoaderColor
}
