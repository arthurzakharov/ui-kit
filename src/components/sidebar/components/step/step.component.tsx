import { ControlStatus } from '@controls/control-status';
import type { State } from '@controls/utils/types';
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
      <ControlStatus state={state} />
      <Text tag="span" weight="medium" size="body-small" color={state === 'idle' ? 'text-secondary' : 'text-primary'}>
        {text}
      </Text>
    </Flex>
  );
};
