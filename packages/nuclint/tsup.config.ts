import {
  defineConfig,
} from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  splitting: false,
  dts: true,
  clean: true,
  minify: true,
  format: [
    'cjs',
    'esm',
  ],
});
