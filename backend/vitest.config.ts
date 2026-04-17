import { defineConfig } from 'vitest/config';

const integration = process.env.RUN_INTEGRATION_TESTS === 'true';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: integration ? ['tests/integration/**/*.test.ts'] : ['tests/**/*.test.ts'],
    exclude: integration ? [] : ['tests/integration/**/*.test.ts'],
    testTimeout: 30000
  }
});
