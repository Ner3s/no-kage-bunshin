import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

const FilesDontNeedToBeTested = [
  'eslint.config.mjs',
  'vite.config.ts',
  'vitest.config.ts',
  'src/App.tsx',
  'src/main.tsx',
  'src/routes.ts',
  'src/pages/**',
  '**/wailsjs/**',
  'dist/**',
  'coverage/**',
  'scripts/**'
];

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      ...FilesDontNeedToBeTested
    ],
    isolate: true,
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '**/wailsjs/**', ...FilesDontNeedToBeTested]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
