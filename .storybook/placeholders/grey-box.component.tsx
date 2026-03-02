import type { PropsWithChildren } from 'react';
import { Text } from '@components/text/text.component';

interface GreyBoxProps extends PropsWithChildren {
  className?: string;
  inline?: boolean;
  id?: string;
  size?: number;
  asText?: boolean;
}

export const GreyBox = ({ inline, id, size, asText, className, children }: GreyBoxProps) => (
  <div
    data-testid={id}
    style={{
      width: size,
      height: size,
      backgroundColor: 'var(--rm-ui-grey-700)',
      borderRadius: 'var(--rm-ui-border-radius-sm)',
      padding: 'var(--rm-ui-padding-xs)',
      display: inline ? 'inline-flex' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    className={className}
  >
    {asText ? (
      <Text size="hl4" align="center" color="grey-50" style={{ margin: 0 }}>
        {children}
      </Text>
    ) : (
      children
    )}
  </div>
);
