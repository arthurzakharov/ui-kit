import { createElement, type HTMLAttributes } from 'react';
import { isHtmlString } from '@utils/functions';

export interface ContentProps extends HTMLAttributes<HTMLElementTagNameMap> {
  tag?: keyof HTMLElementTagNameMap;
  alwaysRender?: boolean;
}

/**
 * Renders content that can be either a string (potentially containing HTML) or React nodes.
 * If the content is a string that contains HTML tags, it uses dangerouslySetInnerHTML to render it as HTML.
 * If the content is a plain string without HTML tags, it renders them directly.
 * If the content is React nodes, it renders them directly.
 * The 'alwaysRender' prop allows rendering an empty tag even if there are no children, which can be useful for layout purposes.
 */
export const Content = ({ tag = 'div', alwaysRender = false, children, ...rest }: ContentProps) => {
  if (!alwaysRender && !children) return null;
  return isHtmlString(children)
    ? createElement(tag, { dangerouslySetInnerHTML: { __html: children }, ...rest }, null)
    : createElement(tag, rest, children);
};
