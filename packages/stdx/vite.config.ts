import {
  resolve,
} from 'node:path';
import {
  defineConfig,
} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: [
        'cjs',
        'es',
      ],
      name: 'Stdx',
      fileName: 'stdx',
    },
  },
});
