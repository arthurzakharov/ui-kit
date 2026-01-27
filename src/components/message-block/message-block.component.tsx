import type { PropsWithChildren } from 'react';
import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';
import cn from '@components/message-block/message-block.module.css';

export interface MessageBlockProps extends PropsWithChildren {
  emoji?: string;
  title?: string;
  subtitle?: string;
}

export const MessageBlock = (props: MessageBlockProps) => {
  const { children, emoji, title = '', subtitle = '' } = props;

  return (
    <Flex direction="column" justify="start" gap="lg">
      {emoji ? <div className={cn.MessageBlockEmoji}>{emoji}</div> : null}
      {title || subtitle ? (
        <Flex direction="column" justify="start" gap="xs">
          {title ? (
            <Text.Tag tag="h2" weight="medium" size="hl2" color="primary">
              {title}
            </Text.Tag>
          ) : null}
          {subtitle ? (
            <Text.Tag tag="h6" weight="regular" size="regular" color="secondary">
              {subtitle}
            </Text.Tag>
          ) : null}
        </Flex>
      ) : null}
      <Text.Tag tag="div" weight="regular" size="regular" color="primary" className={cn.MessageBlockContent}>
        {children}
      </Text.Tag>
    </Flex>
  );
};
