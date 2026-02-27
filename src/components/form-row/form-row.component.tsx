import type { Base, Size } from '@utils/types';
import { Children, type PropsWithChildren } from 'react';
import { Flex } from '@components/flex/flex.component';

export interface FormRowProps extends PropsWithChildren<Base> {
  gap: Size;
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
