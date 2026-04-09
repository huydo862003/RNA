import type { Linter } from 'eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export const baseConfig: Linter.Config[] = [
  stylistic.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin,
      'unicorn': unicorn,
    },
    ignores: [
      'node_modules',
      'dist',
      'storybook-static',
    ],
  },
];
