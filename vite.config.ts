/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'node:path';
import url from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  logLevel: 'info',
  plugins: [
    react(),
    dts({
      logLevel: 'warn',
      rollupTypes: false,
      tsconfigPath: './tsconfig.app.json',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx', './src/storybook/**/*'],
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
              '**/control.types.ts',
              './src/storybook/**/*',
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
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: ['./.storybook/**', './**/index.ts', './**/*.css', './src/storybook/**/*'],
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
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@story': path.resolve(__dirname, './src/storybook'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
