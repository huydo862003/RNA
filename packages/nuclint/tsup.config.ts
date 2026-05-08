import {
  defineConfig,
} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  dts: true,
  clean: true,
  minify: true,
  format: [
    'cjs',
    'esm',
  ],
  external: [
    'eslint',
    /eslint-plugin/,
    '@stylistic/eslint-plugin',
    'eslint-plugin-perfectionist',
    'typescript-eslint',
    'vue-eslint-parser',
  ],
});
