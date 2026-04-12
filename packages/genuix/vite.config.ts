import {
  resolve,
} from 'node:path';
import {
  defineConfig,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Genuix',
      fileName: 'genuix',
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || '';
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
