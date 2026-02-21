import type { PropsWithChildren } from 'react';

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface Base {
  className?: string;
}

export interface BaseWithChildren extends Base, PropsWithChildren {}
