import clsx from 'clsx';
import type { ControlCaptionColor, ControlCaptionSize } from '@controls/utils';
import { Content } from '@utils/content';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/primitives/caption/caption.module.css';

export interface CaptionProps extends Base {
  text: string;
  size?: ControlCaptionSize;
  color?: ControlCaptionColor;
  checked?: boolean;
  oneLine?: boolean;
}

export const Caption = ({
  // Caption props
  text,
  size = 'body',
  color = 'text-primary',
  checked = false,
  oneLine = false,
  // Base props
  ...base
}: CaptionProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'caption')}
    className={clsx(cn.Caption, baseProps(base, 'className'), {
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
      {text}
    </Content>
  </div>
);
