import clsx from 'clsx';
import type { FooterProps } from './footer.types';
import cn from './footer.module.css';

export const Footer = ({ name, links, className = '' }: FooterProps) => (
  <footer data-testid="footer" className={clsx(cn.Footer, className)}>
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
