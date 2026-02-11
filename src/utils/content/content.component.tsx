import { createElement, type HTMLAttributes } from 'react';
import { isHtmlString } from '@utils/functions';

export interface ContentProps extends HTMLAttributes<HTMLElementTagNameMap> {
  tag?: keyof HTMLElementTagNameMap;
  alwaysRender?: boolean;
}

export const Content = ({ tag = 'div', alwaysRender = false, children, ...rest }: ContentProps) => {
  if (!alwaysRender && !children) return null;
  return isHtmlString(children)
    ? createElement(tag, { dangerouslySetInnerHTML: { __html: children }, ...rest }, null)
    : createElement(tag, rest, children);
};
