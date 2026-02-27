import type { Preview } from '@storybook/react-vite';
import '@story/assets/styles.css';
import '@styles/styles.css';
import '@styles/variables.css';

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        iphone14: {
          name: 'iPhone 14',
          type: 'mobile',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        iphone14pro: {
          name: 'iPhone 14 Pro',
          type: 'mobile',
          styles: {
            width: '393px',
            height: '852px',
          },
        },
        iphone14proMax: {
          name: 'iPhone 14 Pro Max',
          type: 'mobile',
          styles: {
            width: '430px',
            height: '932px',
          },
        },
        ipad: {
          name: 'iPad',
          type: 'tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        ipad11p: {
          name: '	iPad Pro 11-in',
          type: 'tablet',
          styles: {
            width: '834px',
            height: '1194px',
          },
        },
        ipad12p: {
          name: '	iPad Pro 12.9-in',
          type: 'tablet',
          styles: {
            width: '1024px',
            height: '1366px',
          },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
