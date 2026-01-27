import type { CSSProperties, ReactNode } from 'react';

export const SIZE = {
  MAX_APP_WIDTH: 1110,
  SIDEBAR: 350,
  PC_CONTENT: 600,
  MOBILE_CONTENT: 375,
} as const;

export type Size = (typeof SIZE)[keyof typeof SIZE];

export const MaxWidth = (maxWidth: Size = SIZE.PC_CONTENT, style?: CSSProperties) => {
  return (storyFn: () => ReactNode) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          ...style,
        }}
      >
        <div
          style={{
            maxWidth,
            width: '100%',
          }}
        >
          {storyFn()}
        </div>
      </div>
    );
  };
};
