import type { CertificationsProps } from './certifications.types';
import { FreeIcon } from './icons/free.icon';
import { GdprIcon } from './icons/gdpr.icon';
import { SslIcon } from './icons/ssl.icon';
import cn from './certifications.module.css';

export const Certifications = ({ icons = ['free', 'gdpr', 'ssl'] }: CertificationsProps) => (
  <div className={cn.Certifications}>
    {icons.map((icon) => {
      switch (icon) {
        case 'free':
          return <FreeIcon key={icon} />;
        case 'gdpr':
          return <GdprIcon key={icon} />;
        case 'ssl':
          return <SslIcon key={icon} />;
      }
    })}
  </div>
);
