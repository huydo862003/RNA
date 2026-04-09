import type { Linter } from 'eslint';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';

export const vueConfig: Linter.Config[] = [
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
];
