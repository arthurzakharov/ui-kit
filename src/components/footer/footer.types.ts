interface FooterLink {
  text: string;
  onClick: () => void;
}

export interface FooterProps {
  name: string;
  links: FooterLink[];
}
