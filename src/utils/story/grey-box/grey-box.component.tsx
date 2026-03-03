import type { PropsWithChildren } from 'react';
import { Text } from '@components/text/text.component';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';

interface GreyBoxProps extends PropsWithChildren<Base> {
  inline?: boolean;
  size?: number;
  asText?: boolean;
}

export const GreyBox = ({ children, inline, size, asText, ...base }: GreyBoxProps) => (
  <div
    data-testid={baseProps(base, 'data-testid')}
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
    className={baseProps(base, 'className')}
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
