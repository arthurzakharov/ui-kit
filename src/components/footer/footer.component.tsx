import cn from './footer.module.css';

export interface FooterLink {
  text: string;
  onClick: () => void;
}

export interface FooterProps {
  name: string;
  links: () => FooterLink[];
}

export const Footer = (props: FooterProps) => {
  const { name = '', links = () => [] } = props;

  const copyright = (name: string): string => {
    return name ? `© ${new Date().getFullYear()} ${name}` : '';
  };

  return (
    <footer className={cn.Footer}>
      <span data-testid="footer-copyright" className={cn.FooterCopyright}>
        {copyright(name)}
      </span>
      <ul className={cn.FooterLinks}>
        {links().map((link) => (
          <li key={link.text} className={cn.FooterLink}>
            <button
              data-testid="footer-button"
              type="button"
              className={cn.FooterButton}
              onClick={(e) => {
                e.currentTarget.blur();
                link.onClick();
              }}
            >
              {link.text}
            </button>
            <div className={cn.FooterSeparator} />
          </li>
        ))}
      </ul>
    </footer>
  );
};
