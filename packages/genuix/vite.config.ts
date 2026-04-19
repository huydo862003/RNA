/* #human-slop
   https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

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
  resolve: {
    alias: {
      '@': './src/',
      '$storybook': './.storybook/',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Genuix',
      fileName: 'genuix',
    },
    rollupOptions: {
      external: [
        'vue',
        '@phosphor-icons/vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@phosphor-icons/vue': 'Phosphor',
        },
      },
    },
  },
});
