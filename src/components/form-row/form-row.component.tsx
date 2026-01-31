import type { Padding } from '@utils/types';
import { Children, type PropsWithChildren } from 'react';
import { Flex } from '@components/flex/flex.component';

export interface FormRowProps extends PropsWithChildren {
  gap: Padding;
}

export const FormRow = (props: FormRowProps) => {
  const { children, gap = 'sm' } = props;

  if (Children.count(children) === 0) return null;

  return (
    <Flex direction="column" align="stretch" grow="equal" gap={gap} changeDirectionAfter="tablet">
      {children}
    </Flex>
  );
};
