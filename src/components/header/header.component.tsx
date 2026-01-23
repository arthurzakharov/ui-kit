import { CircleCheck, Phone } from 'lucide-react';
import clsx from 'clsx';
import cn from '@components/header/header.module.css';

export interface HeaderDescription {
  size: 's' | 'm';
  value: string;
}

export interface HeaderProps {
  logo: string;
  logoCondition?: () => string;
  tel?: string;
  descriptions?: HeaderDescription[];
}

export const Header = (props: HeaderProps) => {
  const { logo, logoCondition = () => '', tel = '', descriptions = [] } = props;
  const logoSrc = logoCondition() || logo;

  const getTelForLink = (tel: string): string => 'tel:+49' + tel.replace(/^0|[^0-9.]/g, '');

  const onClick = (): void => {
    if (tel) window.open(getTelForLink(tel), '_self');
  };

  return (
    <header className={cn.Header}>
      {logoSrc ? (
        <img className={cn.HeaderLogo} alt="logo-icon" src={logoSrc} />
      ) : (
        <i className={cn.HeaderLogoPlaceholder} />
      )}
      <div className={cn.HeaderInfo}>
        {tel ? (
          <button className={cn.HeaderPhoneButton} onClick={onClick}>
            <Phone className={cn.HeaderPhoneButtonIcon} />
            <span className={cn.HeaderPhoneButtonNumber}>{tel}</span>
          </button>
        ) : null}
        {descriptions.map((description, index) => (
          <div key={index} className={cn.HeaderDescriptions} data-size={description.size}>
            <CircleCheck
              className={clsx(cn.HeaderDescriptionsIcon, {
                [cn.HeaderDescriptionsIconSm]: description.size === 's',
                [cn.HeaderDescriptionsIconMd]: description.size === 'm',
              })}
              data-size={description.size}
            />
            <span>{description.value}</span>
          </div>
        ))}
      </div>
    </header>
  );
};
