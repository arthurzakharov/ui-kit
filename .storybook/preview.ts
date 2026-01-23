import type { Preview } from '@storybook/react-vite';
import '@styles/styles.css';
import '@styles/variables.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      options: {
        dark: { name: 'light', value: '#f9fcff' },
        light: { name: 'dark', value: '#3d3d3d' },
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
