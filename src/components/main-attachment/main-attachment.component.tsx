import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
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
        <Text
          preset="page-title"
          className={clsx(cn.MainAttachmentTitle, { [cn.MainAttachmentTitleWithSubtitle]: !!subtitle })}
        >
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text preset="page-subtitle" className={cn.MainAttachmentSubtitle}>
          {subtitle}
        </Text>
      ) : null}
      <AnimationFadeScale name="attachment-main" condition animateOnStart duration={0.2} delay={0.1}>
        {children}
      </AnimationFadeScale>
    </div>
  );
};
