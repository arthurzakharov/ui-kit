import type { ReactNode } from 'react';
import { Check, CircleQuestionMark, X, CircleAlert } from 'lucide-react';
import clsx from 'clsx';
import cn from '@components/message/message.module.css';

export interface MessageProps {
  type: 'success' | 'question' | 'error' | 'info';
  title: () => ReactNode;
  text: () => ReactNode;
}

export const Message = (props: MessageProps) => {
  const { type = 'info', title = '', text = '' } = props;

  const icon = (): ReactNode => {
    switch (type) {
      case 'success':
        return <Check className={cn.MessageIcon} />;
      case 'question':
        return <CircleQuestionMark className={cn.MessageIcon} />;
      case 'error':
        return <X className={cn.MessageIcon} />;
      case 'info':
        return <CircleAlert className={cn.MessageIcon} />;
    }
  };

  return (
    <div
      className={clsx(cn.Message, {
        [cn.MessageTypeSuccess]: type === 'success',
        [cn.MessageTypeQuestion]: type === 'question',
        [cn.MessageTypeError]: type === 'error',
        [cn.MessageTypeInfo]: type === 'info',
      })}
    >
      {icon()}
      <div className={clsx(cn.MessageContent)}>
        {title ? <div className={cn.MessageTitle}>{title()}</div> : null}
        {text ? <div className={cn.MessageText}>{text()}</div> : null}
      </div>
    </div>
  );
};
