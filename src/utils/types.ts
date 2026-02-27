export const SIZE = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const;

export type Size = (typeof SIZE)[number];

export const FONT_ALIGN = ['left', 'center', 'right'] as const;

export type FontAlign = (typeof FONT_ALIGN)[number];

export const FONT_WEIGHT = ['light', 'regular', 'medium', 'bold'] as const;

export type FontWeight = (typeof FONT_WEIGHT)[number];

export const FONT_SIZE = [
  'body-extra-small',
  'body-small',
  'body',
  'body-large',
  'hl5',
  'hl4',
  'hl3',
  'hl2',
  'hl1',
] as const;

export type FontSize = (typeof FONT_SIZE)[number];

export const FONT_COLOR = [
  'text-primary',
  'text-secondary',
  'accent-primary',
  'accent-secondary',
  'theme-primary',
  'theme-secondary',
  'error',
  'success',
  'focus',
  'link',
  'grey-950',
  'grey-900',
  'grey-800',
  'grey-700',
  'grey-600',
  'grey-500',
  'grey-400',
  'grey-300',
  'grey-200',
  'grey-100',
  'grey-50',
] as const;

export type FontColor = (typeof FONT_COLOR)[number];

export interface Base {
  className?: string;
  ['data-testid']?: string;
}

export const TEXT_PRESET = ['page-info', 'page-subtitle', 'page-title', 'sidebar-title', 'step-title'] as const;

export type TextPreset = (typeof TEXT_PRESET)[number];

export type TagNames = keyof HTMLElementTagNameMap;
