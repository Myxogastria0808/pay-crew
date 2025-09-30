import { defineConfig } from 'orval';

export default defineConfig({
  openApi: {
    input: {
      target: './openapi.json',
    },
    output: {
      target: 'src/api/api.ts',
      mode: 'split',
      client: 'swr',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: './src/api/customFetch.ts',
          name: 'customFetch',
        },
      },
      mock: {
        type: 'msw',
        delay: 1000,
        useExamples: true,
        generateEachHttpStatus: true,
      },
    },
    hooks: {
      afterAllFilesWrite: 'pnpm run fmt',
    },
  },
});
