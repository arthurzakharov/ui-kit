import type { BaseProps } from '../../utils/types';

export interface FooterProps extends BaseProps {
  name: string;
  links: {
    text: string;
    onClick: () => void;
  }[];
}
