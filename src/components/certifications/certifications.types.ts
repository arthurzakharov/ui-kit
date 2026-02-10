import type { BaseProps } from '@utils/types';

type CertificationsIcon = 'free' | 'gdpr' | 'ssl';

export interface CertificationsProps extends BaseProps {
  icons: CertificationsIcon[];
}
