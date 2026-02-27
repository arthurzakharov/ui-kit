import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';

export interface InfoProps {
  data: [string, string][];
}

export const Info = (props: InfoProps) => {
  const { data = [] } = props;

  return (
    <Flex direction="column" justify="start" gap="sm">
      {data.map(([key, value]) => (
        <Flex key={key} direction="row" gap="xs" align="center" justify="space-between">
          <Text tag="span" size="body-small" color="text-secondary">
            {key}
          </Text>
          <Text tag="span" size="body-small" align="right">
            {value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
