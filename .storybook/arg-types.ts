export const animationArgTypes = {
  ease: {
    control: 'select',
    options: [
      'linear',
      'easeIn',
      'easeOut',
      'easeInOut',
      'circIn',
      'circOut',
      'circInOut',
      'backIn',
      'backOut',
      'backInOut',
      'anticipate',
    ],
  },
  type: { control: 'select', options: ['decay', 'spring', 'keyframes', 'tween', 'inertia'] },
  duration: { control: { type: 'number', min: 0, step: 0.05 } },
  delay: { control: { type: 'number', min: 0, step: 0.05 } },
  keepMount: { control: 'boolean' },
  className: { control: 'text' },
} as const;
