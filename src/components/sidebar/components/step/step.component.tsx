import { Control } from '@components/control/control.component';
import type { State } from '@components/control/control.types';
import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';

export interface StepProps {
  state: State;
  text: string;
}

export const Step = (props: StepProps) => {
  const { state = 'idle', text = '' } = props;

  return (
    <Flex direction="row" align="center" justify="start" gap="xs">
      <Control.Status state={state} />
      <Text.Tag tag="span" weight="medium" size="small" color={state === 'idle' ? 'secondary' : 'primary'}>
        {text}
      </Text.Tag>
    </Flex>
  );
};
