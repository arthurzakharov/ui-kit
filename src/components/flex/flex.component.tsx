import { Children, createElement, type HTMLAttributes, isValidElement, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { Size } from '@utils/types';
import cn from '@components/flex/flex.module.css';

type TagNames = keyof HTMLElementTagNameMap;

type Position = 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';

type Grow = 'content' | 'equal';

type Direction = 'row' | 'column';

type FontAlign = 'center' | 'start' | 'end' | 'stretch';

type Justify = 'center' | 'start' | 'end' | 'space-between';

type ScreeSize = 'tablet' | 'laptop' | 'desktop';

export interface FlexProps extends PropsWithChildren, HTMLAttributes<HTMLElementTagNameMap[TagNames]> {
  tag?: TagNames;
  gap?: Size;
  pos?: Position;
  basis?: string | number;
  grow?: Grow;
  direction?: Direction;
  wrap?: boolean;
  align?: FontAlign;
  justify?: Justify;
  mt?: Size;
  mb?: Size;
  ml?: Size;
  mr?: Size;
  mx?: Size;
  my?: Size;
  m?: Size;
  changeDirectionAfter?: ScreeSize;
}

export const Flex = (props: FlexProps) => {
  const {
    children,
    tag = 'div',
    gap,
    pos,
    basis,
    grow,
    direction = 'row',
    wrap,
    align,
    justify,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    m,
    changeDirectionAfter,
    className,
    ...rest
  } = props;

  return createElement(tag, {
    className: clsx(cn.Flex, className),
    'data-fd': direction,
    'data-fd-change-after': changeDirectionAfter,
    'data-fxw': wrap ? 'wrap' : 'nowrap',
    'data-gap': gap,
    'data-ai': align || (direction === 'column' ? 'stretch' : 'start'),
    'data-jc': justify || 'start',
    'data-mt': mt,
    'data-mb': mb,
    'data-ml': ml,
    'data-mr': mr,
    'data-mx': mx,
    'data-my': my,
    'data-m': m,
    'data-pos': pos,
    style: typeof basis !== 'undefined' ? { flexBasis: typeof basis === 'number' ? `${basis}%` : basis } : undefined,
    children: Children.map(children, (child) =>
      isValidElement(child) && grow === 'equal' ? (
        <div style={{ flexBasis: `${Math.floor((100 / Children.count(children)) * 100) / 100}%` }}>{child}</div>
      ) : (
        child
      ),
    ),
    ...rest,
  });
};
