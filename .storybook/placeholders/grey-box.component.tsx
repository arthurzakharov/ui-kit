import type { PropsWithChildren } from 'react';
import { Text } from '@components/text/text.component';

type GreyBoxProps = {
  id: string;
  size: number;
} & PropsWithChildren;

export const GreyBox = ({ id, size, children }: GreyBoxProps) => (
  <div
    data-testid={id}
    style={{
      width: size,
      height: size,
      backgroundColor: 'var(--rm-ui-grey-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text.Tag tag="h4" size="hl4" align="center" style={{ color: 'var(--rm-ui-grey-50)' }}>
      {children}
    </Text.Tag>
  </div>
);
