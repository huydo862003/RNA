import type {
  Linter,
} from 'eslint';

/* Vue structure rules enforce SFC file structure and block organization */

export const vueStructureRules: Linter.RulesRecord = {
  // Require explicit lang attributes on <script>, <template>, and <style>
  'vue/block-lang': [
    'error',
    {
      script: {
        lang: 'ts',
        allowNoLang: false,
      },
      template: {
        lang: 'html',
        allowNoLang: false,
      },
      style: {
        lang: 'scss',
        allowNoLang: true,
      },
    },
  ],
  // Enforce newlines between <template>, <script> and <style>
  'vue/block-tag-newline': [
    'error',
    {
      singleline: 'always',
      multiline: 'always',
    },
  ],
  // Disallow empty <template>, <script>, or <style> blocks
  'vue/no-empty-component-block': 'error',
  // Enforce composition API with script setup
  'vue/component-api-style': [
    'error',
    ['script-setup'],
  ],
  // Require scoped style attribute, disallow global styles
  'vue/enforce-style-attribute': [
    'error',
    {
      allow: ['scoped'], // Allow scoped only
    },
  ],
  // Disallow <style> blocks
  'vue/no-restricted-block': [
    'warn',
    {
      'element': 'style',
      'message': 'Do not use <style> block in this project.',
    },
  ],
  // Require blank lines between top-level blocks
  'vue/padding-line-between-blocks': [
    'error',
    'always',
  ],
  // Enforce 2-space indentation in <script>
  'vue/script-indent': [
    'error',
    2,
    {
      baseIndent: 0,
      switchCase: 0,
    },
  ],
};
