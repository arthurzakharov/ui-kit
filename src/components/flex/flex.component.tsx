import { Children, createElement, isValidElement, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import cn from '@components/flex/flex.module.css';

export interface FlexProps extends PropsWithChildren {
  tag?: keyof HTMLElementTagNameMap;
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  basis?: string | number;
  grow?: 'content' | 'equal';
  direction?: 'column' | 'row';
  align?: 'center' | 'start' | 'end';
  justify?: 'center' | 'start' | 'end' | 'space-between';
  marginTop?: 'sm' | 'md';
  marginBottom?: 'sm' | 'md';
  className?: string;
  changeDirectionAfterTabletSize?: boolean;
  changeDirectionAfterLaptopSize?: boolean;
  changeDirectionAfterPcSize?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    children,
    tag = 'div',
    gap,
    basis,
    grow,
    direction = 'row',
    align,
    justify,
    marginTop,
    marginBottom,
    className = '',
    changeDirectionAfterTabletSize = false,
    changeDirectionAfterLaptopSize = false,
    changeDirectionAfterPcSize = false,
  } = props;

  return createElement(tag, {
    style: typeof basis !== 'undefined' ? { flexBasis: typeof basis === 'number' ? `${basis}%` : basis } : undefined,
    className: clsx(
      clsx(cn.Flex, className, {
        [cn.FlexChangeDirectionAfterTabletSize]: changeDirectionAfterTabletSize,
        [cn.FlexChangeDirectionAfterLaptopSize]: changeDirectionAfterLaptopSize,
        [cn.FlexChangeDirectionAfterPcSize]: changeDirectionAfterPcSize,
        [cn.FlexDirectionColumn]: direction === 'column',
        [cn.FlexDirectionRow]: direction === 'row',
        [cn.FlexGapXxs]: gap === 'xxs',
        [cn.FlexGapXs]: gap === 'xs',
        [cn.FlexGapSm]: gap === 'sm',
        [cn.FlexGapMd]: gap === 'md',
        [cn.FlexGapLg]: gap === 'lg',
        [cn.FlexGapXl]: gap === 'xl',
        [cn.FlexGapXxl]: gap === 'xxl',
        [cn.FlexGapXxxl]: gap === 'xxxl',
        [cn.FlexMarginTopSm]: marginTop === 'sm',
        [cn.FlexMarginTopMd]: marginTop === 'md',
        [cn.FlexMarginBottomSm]: marginBottom === 'sm',
        [cn.FlexMarginBottomMd]: marginBottom === 'md',
        [cn.FlexAlignCenter]: align === 'center',
        [cn.FlexAlignStart]: align === 'start',
        [cn.FlexAlignEnd]: align === 'end',
        [cn.FlexJustifyCenter]: justify === 'center',
        [cn.FlexJustifyStart]: justify === 'start',
        [cn.FlexJustifyEnd]: justify === 'end',
        [cn.FlexJustifySpaceBetween]: justify === 'space-between',
      }),
    ),
    children: Children.map(children, (child) =>
      isValidElement(child) && grow === 'equal' ? (
        <div style={{ flexBasis: `${Math.floor((100 / Children.count(children)) * 100) / 100}%` }}>{child}</div>
      ) : (
        child
      ),
    ),
  });
};
