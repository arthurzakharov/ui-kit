import type { PropsWithChildren } from 'react';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { Certifications, type CertificationsProps } from '@components/certifications';
import { Line } from '@components/line/line.component';
import { Text } from '@components/text/text.component';
import { UserPanel, type UserPanelProps } from '@components/user-panel/user-panel.component';
import { Board } from '@components/sidebar/components/board/board.component';
import { Info, type InfoProps } from '@components/sidebar/components/info/info.component';
import { Steps, type StepsProps } from '@components/sidebar/components/steps/steps.component';
import cn from '@components/sidebar/sidebar.module.css';

export interface SidebarProps extends PropsWithChildren {
  isButtonVisible: boolean;
  isUserOpen: boolean;
  title: string;
  steps: StepsProps['data'];
  info: InfoProps['data'];
  user: UserPanelProps;
  certifications: CertificationsProps['icons'];
}

export const Sidebar = (props: SidebarProps) => {
  const {
    children,
    isButtonVisible = false,
    isUserOpen = false,
    title = 'Ihre Übersicht',
    steps = [],
    info = [],
    certifications = [],
    user,
  } = props;

  return (
    <Board>
      <div className={cn.SidebarTitle}>
        <Text.SidebarTitle>{title}</Text.SidebarTitle>
      </div>
      <Steps data={steps} />
      <Line />
      <Info data={info} />
      <Line />
      <AnimationFadeScale name="user" condition={isUserOpen}>
        <UserPanel title={user.title} button={user.button} data={user.data} onClick={user.onClick} />
        <Line />
      </AnimationFadeScale>
      <AnimationFadeScale name="button" condition={isButtonVisible} duration={0.2} delay={0.1}>
        <div className={cn.SidebarButton}>{children}</div>
      </AnimationFadeScale>
      <Certifications icons={certifications} />
    </Board>
  );
};
