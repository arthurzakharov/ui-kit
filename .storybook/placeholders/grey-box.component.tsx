import type { PropsWithChildren } from 'react';
import { Text } from '@components/text/text.component';

interface GreyBoxProps extends PropsWithChildren {
  id?: string;
  size?: number;
  asText?: boolean;
}

export const GreyBox = ({ id, size, asText, children }: GreyBoxProps) => (
  <div
    data-testid={id}
    style={{
      width: size,
      height: size,
      backgroundColor: 'var(--rm-ui-grey-700)',
      borderRadius: 'var(--rm-ui-border-radius-sm)',
      padding: 'var(--rm-ui-padding-xs)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {asText ? (
      <Text tag="h4" size="hl4" align="center" color="grey-50">
        {children}
      </Text>
    ) : (
      children
    )}
  </div>
);
