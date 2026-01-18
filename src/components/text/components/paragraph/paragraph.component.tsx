import { createElement, type HTMLAttributes, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import cn from './paragraph.module.css';

export interface ParagraphProps<T extends keyof HTMLElementTagNameMap>
  extends PropsWithChildren, HTMLAttributes<HTMLElementTagNameMap[T]> {
  tag?: T;
}

export function Paragraph<T extends keyof HTMLElementTagNameMap>(props: ParagraphProps<T>) {
  const { tag = 'p', children, className, ...rest } = props;

  return createElement(tag, { children, className: clsx(cn.Paragraph, className), ...rest });
}
