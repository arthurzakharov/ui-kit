import type { FooterProps } from '@components/footer/footer.types';
import cn from '@components/footer/footer.module.css';

export const Footer = (props: FooterProps) => {
  const copyright = () => (props.name ? `© ${new Date().getFullYear()} ${props.name}` : '');

  return (
    <footer className={cn.Footer}>
      <span data-cy="footer-copyright" className={cn.Copyright}>
        {copyright()}
      </span>
      <ul className={cn.Links}>
        {props.links.map((link) => (
          <li key={link.text} data-cy="footer-link" className={cn.Link}>
            <button
              data-cy="footer-button"
              type="button"
              className={cn.Button}
              onClick={(e) => {
                e.currentTarget.blur();
                link.onClick();
              }}
            >
              {link.text}
            </button>
            <div data-cy="footer-separator" className={cn.Separator} />
          </li>
        ))}
      </ul>
    </footer>
  );
};
