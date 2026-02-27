import { createElement, type HTMLAttributes } from 'react';
import { isHtmlString } from '@utils/functions';

type TagNames = keyof HTMLElementTagNameMap;

export interface ContentProps extends HTMLAttributes<HTMLElementTagNameMap> {
  tag?: TagNames;
  alwaysRender?: boolean;
}

/**
 * Renders content that can be either a string (potentially containing HTML) or React nodes.<br>
 * With **tag**, you can specify which HTML tag to use for rendering the content (default is *div*).<br>
 * If the **content** is a string that contains HTML tags, it uses *dangerouslySetInnerHTML* to render it as HTML.<br>
 * If the **content** is a plain string without HTML tags, it renders them directly.<br>
 * If the **content** is React nodes, it renders them directly.<br>
 * The **alwaysRender** prop allows rendering an empty tag even if there are no children, which can be useful for layout purposes.
 */
export const Content = ({ tag = 'div', alwaysRender = false, children, ...rest }: ContentProps) => {
  if (!alwaysRender && !children) return null;
  return isHtmlString(children)
    ? createElement(tag, { dangerouslySetInnerHTML: { __html: children }, ...rest }, null)
    : createElement(tag, rest, children);
};
