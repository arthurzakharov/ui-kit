type CertificationIcon = 'free' | 'gdpr' | 'ssl';

export type CertificationsProps = Readonly<{
  icons?: CertificationIcon[];
}>;
