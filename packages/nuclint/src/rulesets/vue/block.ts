import type {
  Linter,
} from 'eslint';

/* Vue block extension rules mirror block.ts for <template> expressions */

export const vueBlockRules: Linter.RulesRecord = {
  // Enforce one true brace style for code blocks
  'vue/brace-style': [
    'error',
    '1tbs',
  ],
  // Require space inside single-line blocks
  'vue/block-spacing': [
    'error',
    'always',
  ],
  // Require multiline ternary expressions to have breaks at each operator
  'vue/multiline-ternary': [
    'error',
    'always-multiline',
  ],
};
