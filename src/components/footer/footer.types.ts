import type { BaseProps } from '@utils/types';

type FooterLink = {
  text: string;
  onClick: () => void;
}

export interface FooterProps extends BaseProps {
  name: string;
  links: FooterLink[];
}
