/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
