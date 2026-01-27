import { createElement, type HTMLAttributes, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import cn from '@components/text/components/tag/tag.module.css';

type TagNames = keyof HTMLElementTagNameMap;

export interface TagProps extends PropsWithChildren, HTMLAttributes<HTMLElementTagNameMap[TagNames]> {
  tag?: TagNames;
  lined?: boolean;
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  size?: 'regular' | 'small' | 'extra-small';
  color?: 'primary' | 'secondary' | 'accent-primary' | 'accent-secondary';
}

export const Tag = (props: TagProps) => {
  const {
    tag = 'p',
    lined = false,
    align = 'left',
    weight = 'regular',
    size = 'regular',
    color = 'primary',
    children,
    className,
    ...rest
  } = props;

  const classNames = clsx(className, {
    [cn.TagLined]: lined,
    [cn.TagAlignLeft]: align === 'left',
    [cn.TagAlignCenter]: align === 'center',
    [cn.TagAlignRight]: align === 'right',
    [cn.TagWeightLight]: weight === 'light',
    [cn.TagWeightRegular]: weight === 'regular',
    [cn.TagWeightMedium]: weight === 'medium',
    [cn.TagWeightBold]: weight === 'bold',
    [cn.TagSizeRegular]: size === 'regular',
    [cn.TagSizeSmall]: size === 'small',
    [cn.TagSizeExtraSmall]: size === 'extra-small',
    [cn.TagColorPrimary]: color === 'primary',
    [cn.TagColorSecondary]: color === 'secondary',
    [cn.TagColorAccentPrimary]: color === 'accent-primary',
    [cn.TagColorAccentSecondary]: color === 'accent-secondary',
  });

  return typeof children === 'string'
    ? createElement(tag, {
        className: classNames,
        dangerouslySetInnerHTML: { __html: children },
        ...rest,
      })
    : createElement(tag, {
        className: classNames,
        children,
        ...rest,
      });
};
