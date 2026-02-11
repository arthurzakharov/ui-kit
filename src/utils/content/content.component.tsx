import { createElement, type HTMLAttributes } from 'react';
import { isHtmlString } from '@utils/functions';

export interface ContentProps extends HTMLAttributes<HTMLElementTagNameMap> {
  tag?: keyof HTMLElementTagNameMap;
}

export const Content = ({ tag = 'div', children, ...rest }: ContentProps) => {
  return isHtmlString(children)
    ? createElement(tag, { dangerouslySetInnerHTML: { __html: children }, ...rest }, null)
    : createElement(tag, rest, children);
};
