import type { PropsWithChildren } from 'react';

type SizeBox = {
  size: number;
} & PropsWithChildren;

export const SizeBox = ({ children, size }: SizeBox) => <div style={{ width: size, height: size }}>{children}</div>;
