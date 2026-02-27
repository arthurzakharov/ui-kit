import type { PropsWithChildren } from 'react';

interface SizeBox extends PropsWithChildren {
  size: number;
}

export const SizeBox = ({ children, size }: SizeBox) => <div style={{ width: size, height: size }}>{children}</div>;
