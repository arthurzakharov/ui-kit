import type { PropsWithChildren } from 'react';

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type Base = {
  className?: string;
};

export type BaseWithChildren = Base & PropsWithChildren;
