import { Check, CircleQuestionMark, X, CircleAlert } from 'lucide-react';
import clsx from 'clsx';
import type { MessageProps } from './message.types';
import cn from './message.module.css';

export const Message = ({ type, title, text, className = '' }: MessageProps) => (
  <div
    data-testid="message"
    className={clsx(cn.Message, className, {
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
      {title && (
        <div data-testid="message-title" className={cn.Title}>
          {title}
        </div>
      )}
      {text && (
        <div data-testid="message-text" className={cn.Text}>
          {text}
        </div>
      )}
    </div>
  </div>
);
