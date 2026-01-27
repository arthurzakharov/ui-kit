import { Flex } from '@components/flex/flex.component';
import { Step, type StepProps } from '@components/sidebar/components/step/step.component';

export interface StepsProps {
  data: StepProps[];
}

export const Steps = (props: StepsProps) => {
  const { data } = props;

  return (
    <Flex direction="column" justify="start" gap="sm">
      {data.map(({ state, text }) => (
        <Step key={text} state={state} text={text} />
      ))}
    </Flex>
  );
};
