/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
    // @vitest/coverage-v8
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['html'],
      include: ['src/**/*.ts'],
    },
    // @vitest/ui
    reporters: ['default', 'html'],
  },
});
