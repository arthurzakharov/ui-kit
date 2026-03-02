import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { Certifications, type CertificationsProps } from '@components/certifications';
import { Line } from '@components/line/line.component';
import { Text } from '@components/text/text.component';
import { UserPanel, type UserPanelProps } from '@components/user-panel';
import { ControlStatus } from '@controls/control-status';
import type { State } from '@controls/utils/types';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/sidebar/sidebar.module.css';

type SidebarStep = {
  state: State;
  text: string;
};

type SidebarInfo = [string, string];

export interface SidebarProps extends PropsWithChildren<Base> {
  isButtonVisible: boolean;
  isUserOpen: boolean;
  title: string;
  steps: SidebarStep[];
  info: SidebarInfo[];
  user: UserPanelProps;
  certifications: CertificationsProps['icons'];
}

export const Sidebar = ({
  children,
  isButtonVisible = false,
  isUserOpen = false,
  title = 'Ihre Übersicht',
  steps = [],
  info = [],
  certifications = [],
  user,
  ...base
}: SidebarProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'sidebar')}
    className={clsx(cn.Sidebar, baseProps(base, 'className'))}
  >
    <div className={cn.Board}>
      <Text preset="sidebar-title" className={cn.SidebarTitle}>
        {title}
      </Text>
      <div className={cn.Steps} data-testid="sidebar-steps">
        {steps.map(({ state, text }) => (
          <div key={text} className={cn.Step} data-testid="sidebar-step">
            <ControlStatus state={state} />
            <Text
              tag="span"
              weight="medium"
              size="body-small"
              color={state === 'idle' ? 'text-secondary' : 'text-primary'}
            >
              {text}
            </Text>
          </div>
        ))}
      </div>
      <Line />
      <div className={cn.Info} data-testid="sidebar-info">
        {info.map(([key, value], index) => (
          <div key={`${key}-${index}`} className={cn.InfoRow} data-testid="sidebar-info-row">
            <Text tag="span" size="body-small" color="text-secondary">
              {key}
            </Text>
            <Text tag="span" size="body-small" align="right">
              {value}
            </Text>
          </div>
        ))}
      </div>
      <Line />
      <AnimationFadeScale name="user" condition={isUserOpen}>
        <UserPanel title={user.title} button={user.button} data={user.data} onClick={user.onClick} />
        <Line />
      </AnimationFadeScale>
      <AnimationFadeScale name="button" condition={isButtonVisible}>
        <div className={cn.SidebarButton}>{children}</div>
      </AnimationFadeScale>
      <Certifications icons={certifications} />
    </div>
  </div>
);
