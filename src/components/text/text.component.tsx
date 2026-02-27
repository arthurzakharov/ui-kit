import type { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Content } from '@utils/content';
import type { Base, FontAlign, FontColor, FontSize, FontWeight, TagNames, TextPreset } from '@utils/types';
import cn from '@components/text/text.module.css';

interface TextProps extends HTMLAttributes<HTMLElementTagNameMap>, PropsWithChildren<Base> {
  preset?: TextPreset;
  tag?: TagNames;
  lined?: boolean;
  align?: FontAlign;
  weight?: FontWeight;
  size?: FontSize;
  color?: FontColor;
}

const textPresetMap: Record<TextPreset, Pick<Required<TextProps>, 'tag' | 'weight' | 'size' | 'color'>> = {
  'page-info': { tag: 'p', weight: 'light', size: 'body', color: 'text-secondary' },
  'page-subtitle': { tag: 'h6', weight: 'regular', size: 'body', color: 'text-primary' },
  'page-title': { tag: 'h1', weight: 'medium', size: 'hl2', color: 'text-primary' },
  'sidebar-title': { tag: 'h3', weight: 'medium', size: 'hl3', color: 'text-primary' },
  'step-title': { tag: 'h2', weight: 'medium', size: 'hl4', color: 'text-primary' },
};

export const Text = ({
  children,
  className,
  preset,
  lined = false,
  align = 'left',
  tag = 'p',
  weight = 'regular',
  size = 'body',
  color = 'text-primary',
  ...rest
}: TextProps) => {
  let resolvedTag = tag;
  let resolvedWeight = weight;
  let resolvedSize = size;
  let resolvedColor = color;

  if (preset) {
    const presetStyles = textPresetMap[preset];

    if (tag !== 'p' && tag !== presetStyles.tag) {
      console.warn(
        `Text component: 'tag' prop will be overridden by 'preset="${preset}"'. Remove explicit 'tag' prop if not intended.`,
      );
    }
    if (weight !== 'regular' && weight !== presetStyles.weight) {
      console.warn(
        `Text component: 'weight' prop will be overridden by 'preset="${preset}"'. Remove explicit 'weight' prop if not intended.`,
      );
    }
    if (size !== 'body' && size !== presetStyles.size) {
      console.warn(
        `Text component: 'size' prop will be overridden by 'preset="${preset}"'. Remove explicit 'size' prop if not intended.`,
      );
    }
    if (color !== 'text-primary' && color !== presetStyles.color) {
      console.warn(
        `Text component: 'color' prop will be overridden by 'preset="${preset}"'. Remove explicit 'color' prop if not intended.`,
      );
    }

    resolvedTag = presetStyles.tag;
    resolvedWeight = presetStyles.weight;
    resolvedSize = presetStyles.size;
    resolvedColor = presetStyles.color;
  }

  const classNames = clsx(className, {
    [cn.Lined]: lined,
    // ALIGNMENTS
    [cn.Left]: align === 'left',
    [cn.Center]: align === 'center',
    [cn.Right]: align === 'right',
    // FONT WEIGHTS
    [cn.Light]: resolvedWeight === 'light',
    [cn.Regular]: resolvedWeight === 'regular',
    [cn.Medium]: resolvedWeight === 'medium',
    [cn.Bold]: resolvedWeight === 'bold',
    // FONT SIZES
    [cn.BodyExtraSmall]: resolvedSize === 'body-extra-small',
    [cn.BodySmall]: resolvedSize === 'body-small',
    [cn.Body]: resolvedSize === 'body',
    [cn.BodyLarge]: resolvedSize === 'body-large',
    [cn.HL1]: resolvedSize === 'hl1',
    [cn.HL2]: resolvedSize === 'hl2',
    [cn.HL3]: resolvedSize === 'hl3',
    [cn.HL4]: resolvedSize === 'hl4',
    [cn.HL5]: resolvedSize === 'hl5',
    // COLORS
    [cn.TextPrimary]: resolvedColor === 'text-primary',
    [cn.TextSecondary]: resolvedColor === 'text-secondary',
    [cn.AccentPrimary]: resolvedColor === 'accent-primary',
    [cn.AccentSecondary]: resolvedColor === 'accent-secondary',
    [cn.ThemePrimary]: resolvedColor === 'theme-primary',
    [cn.ThemeSecondary]: resolvedColor === 'theme-secondary',
    [cn.Error]: resolvedColor === 'error',
    [cn.Success]: resolvedColor === 'success',
    [cn.Focus]: resolvedColor === 'focus',
    [cn.Link]: resolvedColor === 'link',
    [cn.Grey950]: resolvedColor === 'grey-950',
    [cn.Grey900]: resolvedColor === 'grey-900',
    [cn.Grey800]: resolvedColor === 'grey-800',
    [cn.Grey700]: resolvedColor === 'grey-700',
    [cn.Grey600]: resolvedColor === 'grey-600',
    [cn.Grey500]: resolvedColor === 'grey-500',
    [cn.Grey400]: resolvedColor === 'grey-400',
    [cn.Grey300]: resolvedColor === 'grey-300',
    [cn.Grey200]: resolvedColor === 'grey-200',
    [cn.Grey100]: resolvedColor === 'grey-100',
    [cn.Grey50]: resolvedColor === 'grey-50',
  });

  return (
    <Content
      data-testid={rest['data-testid'] || 'content'}
      tag={resolvedTag}
      alwaysRender={false}
      className={classNames}
      {...rest}
    >
      {children}
    </Content>
  );
};
