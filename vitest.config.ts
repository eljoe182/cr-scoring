import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude],
    dir: 'tests',
    includeSource: ['src/**/*.{js,ts}'],
  },
});
