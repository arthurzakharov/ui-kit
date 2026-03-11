import type { Size } from '@utils/types';

const SIZE_TO_PIXELS: Record<Size, number> = {
  xxs: 16,
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  xxl: 64,
  xxxl: 72,
};

export const getLoaderSize = (size: Size): number => SIZE_TO_PIXELS[size];
