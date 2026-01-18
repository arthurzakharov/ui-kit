import type { CSSProperties, ReactNode } from 'react';

export const MaxWidth = (maxWidth = 600, style?: CSSProperties) => {
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
