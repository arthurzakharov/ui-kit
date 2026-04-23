import type { PropsWithChildren } from 'react';

interface SizeBox extends PropsWithChildren {
  size: number[];
}

export const SizeBox = ({ children, size = [] }: SizeBox) => (
  <div style={{ width: size[0] || 'initial', height: size[1] || 'initial' }}>{children}</div>
);
