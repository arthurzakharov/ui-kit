import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Content } from '@utils/content';
import type { Base } from '@utils/types';
import type { ControlRadioTextColor, ControlRadioTextSize } from '@controls/utils';
import cn from '@controls/control-radio-text/control-radio-text.module.css';

export interface ControlRadioTextProps extends PropsWithChildren<Base> {
  size?: ControlRadioTextSize;
  color?: ControlRadioTextColor;
  checked?: boolean;
  oneLine?: boolean;
}

export const ControlRadioText = ({
  children,
  size = 'body',
  color = 'text-primary',
  checked = false,
  oneLine = false,
  className = '',
}: ControlRadioTextProps) => (
  <div
    data-testid="control-radio-text"
    className={clsx(cn.ControlRadioText, className, {
      [cn.TextPrimary]: color === 'text-primary',
      [cn.TextSecondary]: color === 'text-secondary',
      [cn.AccentPrimary]: color === 'accent-primary',
      [cn.AccentSecondary]: color === 'accent-secondary',
      [cn.BodyExtraSmall]: size === 'body-extra-small',
      [cn.BodySmall]: size === 'body-small',
      [cn.Body]: size === 'body',
      [cn.BodyLarge]: size === 'body-large',
      [cn.OneLine]: oneLine,
      [cn.Checked]: checked,
    })}
  >
    <Content tag="span" className={cn.Content}>
      {children}
    </Content>
  </div>
);
