import type {
  Linter,
} from 'eslint';
import tselint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin, {
  createNodeResolver,
} from 'eslint-plugin-import-x';
import unicorn from 'eslint-plugin-unicorn';
import n from 'eslint-plugin-n';
import {
  preferLessThanRule,
  noHeavyCommentsRule,
  noTrailingPeriodCommentsRule,
  noSpecialCharactersRule,
  typeLiteralNewlineRule,
} from '../rules';
import {
  typeSafetyRules,
  expressionRules,
  statementRules,
  blockRules,
  importRules,
  namingRules,
  commentRules,
} from '../rulesets';

export const baseConfig: Linter.Config[] = [
  {
    ignores: [
      'node_modules',
      'dist',
      'storybook-static',
      'build',
      'output',
    ],
  },
  ...tselint.configs.strict,
  {
    files: ['**/*.{js,ts,vue,jsx,tsx}'],
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin,
      'unicorn': unicorn,
      'n': n,
      'custom': {
        rules: {
          'prefer-less-than': preferLessThanRule,
          'no-heavy-comments': noHeavyCommentsRule,
          'no-trailing-period-comments': noTrailingPeriodCommentsRule,
          'no-special-characters': noSpecialCharactersRule,
          'type-literal-newline': typeLiteralNewlineRule,
        },
      },
    },
    settings: {
      'import-x/resolver-next': [createNodeResolver()],
    },
    rules: {
      ...typeSafetyRules,
      ...expressionRules,
      ...statementRules,
      ...blockRules,
      ...importRules,
      ...namingRules,
      ...commentRules,
    },
  },
];
