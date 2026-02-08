import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    specPattern: './src/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
