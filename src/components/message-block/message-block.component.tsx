import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import { Text } from '@components/text/text.component';
import cn from '@components/message-block/message-block.module.css';

interface MessageBlockProps extends PropsWithChildren<Base> {
  emoji?: string;
  title?: string;
  subtitle?: string;
}

export const MessageBlock = ({ children, emoji = '', title = '', subtitle = '', ...base }: MessageBlockProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'message-block')}
    className={clsx(cn.MessageBlock, baseProps(base, 'className'))}
  >
    {emoji && (
      <div data-testid="message-block-emoji" className={cn.Emoji}>
        {emoji}
      </div>
    )}
    {(title || subtitle) && (
      <div data-testid="message-block-titles" className={cn.Titles}>
        {title && (
          <Text data-testid="message-block-title" tag="h2" weight="medium" size="hl2">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text data-testid="message-block-subtitle" tag="h6" color="text-secondary">
            {subtitle}
          </Text>
        )}
      </div>
    )}
    <Text data-testid="message-block-content" tag="div" className={cn.Content}>
      {children}
    </Text>
  </div>
);
