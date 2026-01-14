import type { PropsWithChildren } from 'react';
import { Animation } from '../animation/animation.component';
import { Text } from '../text/text.component';
import { Certifications, type CertificationsProps } from '../certifications/certifications.component';
import { Board } from './components/board/board.component';
import { Info, type InfoProps } from './components/info/info.component';
import { Line } from './components/line/line.component';
import { Steps, type StepsProps } from './components/steps/steps.component';
import { User, type UserProps } from './components/user/user.component';
import cn from './sidebar.module.css';

export interface SidebarProps extends PropsWithChildren {
  isButtonVisible: boolean;
  isUserOpen: boolean;
  title: string;
  steps: StepsProps['data'];
  info: InfoProps['data'];
  user: UserProps;
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
      <Animation.FadeScale name="user" condition={isUserOpen}>
        <User title={user.title} button={user.button} data={user.data} onClick={user.onClick} />
        <Line />
      </Animation.FadeScale>
      <Animation.FadeScale name="button" condition={isButtonVisible} duration={0.2} delay={0.1}>
        <div className={cn.SidebarButton}>{children}</div>
      </Animation.FadeScale>
      <Certifications icons={certifications} />
    </Board>
  );
};
