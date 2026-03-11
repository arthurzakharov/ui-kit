import type { ReactNode } from 'react';
import { Check, CircleQuestionMark, X, CircleAlert } from 'lucide-react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import { Content } from '@utils/content';
import type { Base } from '@utils/types';
import cn from '@components/message/message.module.css';

type MessageType = 'success' | 'question' | 'error' | 'info';

export interface MessageProps extends Base {
  type: MessageType;
  title: ReactNode;
  text: ReactNode;
}

/**
 * Displays a message with an icon, title, and text content based on the message type (`success`, `question`, `error`, or `info`).
 */
export const Message = ({ type, title, text, ...base }: MessageProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'message')}
    className={clsx(cn.Message, baseProps(base, 'className'), {
      [cn.Success]: type === 'success',
      [cn.Question]: type === 'question',
      [cn.Error]: type === 'error',
      [cn.Info]: type === 'info',
    })}
  >
    {type === 'success' && <Check data-testid="success-icon" className={cn.Icon} />}
    {type === 'question' && <CircleQuestionMark data-testid="question-icon" className={cn.Icon} />}
    {type === 'error' && <X data-testid="error-icon" className={cn.Icon} />}
    {type === 'info' && <CircleAlert data-testid="info-icon" className={cn.Icon} />}
    <div className={cn.Content}>
      <Content data-testid="message-title" className={cn.Title}>
        {title}
      </Content>
      <Content data-testid="message-text" className={cn.Text}>
        {text}
      </Content>
    </div>
  </div>
);
