import type { Preview } from '@storybook/react-vite';
import '@story/assets/styles.css';
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
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
