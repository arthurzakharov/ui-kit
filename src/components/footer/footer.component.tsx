import type { FooterProps } from '@components/footer/footer.types';
import clsx from 'clsx';
import cn from '@components/footer/footer.module.css';

export const Footer = (props: FooterProps) => (
  <footer data-testid="footer" className={clsx(cn.Footer, props.className)}>
    <span data-testid="footer-copyright" className={cn.Copyright}>
      {props.name ? `© ${new Date().getFullYear()} ${props.name}` : ''}
    </span>
    <ul className={cn.Links}>
      {props.links.map((link) => (
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
