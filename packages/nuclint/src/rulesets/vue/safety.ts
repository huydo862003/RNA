import type {
  Linter,
} from 'eslint';

/* Vue safety rules detect undefined references, unused declarations, and reactivity issues */

export const vueSafetyRules: Linter.RulesRecord = {
  // Disallow using undefined components
  'vue/no-undef-components': 'error',
  // Disallow using undefined directives
  'vue/no-undef-directives': 'error',
  // Disallow using undefined properties
  'vue/no-undef-properties': 'error',
  // Disallow unused emit declarations
  'vue/no-unused-emit-declarations': 'error',
  // Disallow unused template refs
  'vue/no-unused-refs': 'error',
  // Disallow unused component properties
  'vue/no-unused-properties': 'error',
  // Warn when ref/reactive objects lose reactivity
  'vue/no-ref-object-reactivity-loss': 'error',
  // Require typed ref declarations
  'vue/require-typed-ref': 'error',
  // Disallow importing compiler macros (they are auto-available)
  'vue/no-import-compiler-macros': 'error',
};
