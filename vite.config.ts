/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'node:path';
import url from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  logLevel: 'info',
  plugins: [
    react(),
    dts({
      logLevel: 'warn',
      rollupTypes: false,
      tsconfigPath: './tsconfig.app.json',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
    }),
    libInjectCss(),
  ],
  build: {
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1024,
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ui-kit',
      fileName: 'ui-kit',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'clsx', 'usehooks-ts', 'lucide-react'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              '**/*.stories.ts',
              '**/*.stories.tsx',
              '**/*.test.ts',
              '**/*.test.tsx',
              'src/controls/utils/types.ts',
              'src/utils/types.ts',
            ],
          })
          .map((file) => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            url.fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    resolveSnapshotPath: (testPath, snapExtension) =>
      path.resolve(path.dirname(testPath), `${path.basename(testPath)}${snapExtension}`),
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: ['./**/index.ts', './**/*.css'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@story': path.resolve(__dirname, '.storybook'),
      '@animations': path.resolve(__dirname, './src/animations'),
      '@controls': path.resolve(__dirname, './src/controls'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
