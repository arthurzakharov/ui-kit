import type { PropsWithChildren } from 'react';
import cn from './message-block.module.css';

export interface MessageBlockProps extends PropsWithChildren {
  emoji?: string;
  title?: string;
  subtitle?: string;
}

export const MessageBlock = (props: MessageBlockProps) => {
  const { children, emoji, title = '', subtitle = '' } = props;

  return (
    <div className={cn.MessageBlock}>
      {emoji ? <div className={cn.MessageBlockEmoji}>{emoji}</div> : null}
      {title || subtitle ? (
        <div className={cn.MessageBlockHeader}>
          {title ? <h2 className={cn.MessageBlockTitle}>{title}</h2> : null}
          {subtitle ? <h6 className={cn.MessageBlockSubtitle}>{subtitle}</h6> : null}
        </div>
      ) : null}
      <div className={cn.MessageBlockContent}>{children}</div>
    </div>
  );
};
