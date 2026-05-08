import type {
  Linter,
} from 'eslint';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import {
  baseConfig,
} from '../base';
import {
  vueExprRules,
  vueBlockRules,
  vueStatementRules,
  vueStrictRules,
  vueNamingRules,
  vueDeclarationRules,
  vueStructureRules,
  vueTemplateRules,
  vueSafetyRules,
  vueScriptRules,
} from '../../rulesets';

export const vueConfig: Linter.Config[] = [
  ...baseConfig,
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
    rules: {
      // Disable @stylistic/indent for .vue files, vue/script-indent handles it
      '@stylistic/indent': 'off',
      ...vueExprRules,
      ...vueBlockRules,
      ...vueStatementRules,
      ...vueStrictRules,
      ...vueNamingRules,
      ...vueDeclarationRules,
      ...vueStructureRules,
      ...vueTemplateRules,
      ...vueSafetyRules,
      ...vueScriptRules,
    },
  },
];
