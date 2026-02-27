import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/footer/footer.module.css';

type FooterLink = {
  text: string;
  onClick: () => void;
};

interface FooterProps extends Base {
  name: string;
  links: FooterLink[];
}

/**
 * Displays a footer with copyright text and navigational links.
 */
export const Footer = ({ name, links, ...base }: FooterProps) => (
  <footer
    data-testid={baseProps(base, 'data-testid', 'footer')}
    className={clsx(cn.Footer, baseProps(base, 'className'))}
  >
    <span data-testid="footer-copyright" className={cn.Copyright}>
      &copy;&nbsp;{new Date().getFullYear()}&nbsp;{name}
    </span>
    <ul className={cn.Links}>
      {links.map((link) => (
        <li key={link.text} data-testid="footer-link" className={cn.Link}>
          <button
            data-testid="footer-button"
            type="button"
            className={cn.Button}
            onClick={(e) => {
              e.currentTarget.blur();
              link.onClick();
            }}
          >
            {link.text}
          </button>
          <div data-testid="footer-separator" className={cn.Separator} />
        </li>
      ))}
    </ul>
  </footer>
);
