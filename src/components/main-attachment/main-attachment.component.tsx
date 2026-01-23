import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { Animation } from '@components/animation/animation.component';
import { Text } from '@components/text/text.component';
import cn from '@components/main-attachment/main-attachment.module.css';

export interface MainAttachmentProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export const MainAttachment = (props: MainAttachmentProps) => {
  const { children, title = '', subtitle = '' } = props;

  return (
    <div className={cn.MainAttachment}>
      {title ? (
        <div className={clsx(cn.MainAttachmentTitle, { [cn.MainAttachmentTitleWithSubtitle]: !!subtitle })}>
          <Text.PageTitle>{title}</Text.PageTitle>
        </div>
      ) : null}
      {subtitle ? (
        <div className={cn.MainAttachmentSubtitle}>
          <Text.PageSubtitle>{subtitle}</Text.PageSubtitle>
        </div>
      ) : null}
      <Animation.FadeScale name="attachment-main" condition animateOnStart duration={0.2} delay={0.1}>
        {children}
      </Animation.FadeScale>
    </div>
  );
};
