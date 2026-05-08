import type {
  Linter,
} from 'eslint';

/* Vue declaration rules enforce consistent usage of defineProps, defineEmits, and other macros */

export const vueDeclarationRules: Linter.RulesRecord = {
  // Require type-literal style for defineEmits
  'vue/define-emits-declaration': [
    'error',
    'type-literal',
  ],
  // Require JSDoc comments on all props
  'vue/require-prop-comment': [
    'error',
    {
      'type': 'JSDoc',
    },
  ],
  // Prefer defineOptions over manual options
  'vue/prefer-define-options': 'error',
  // Require explicit emits declarations
  'vue/require-explicit-emits': 'error',
  // Require type-based props declaration
  'vue/define-props-declaration': [
    'error',
    'type-based',
  ],
  // Require props destructuring
  'vue/define-props-destructuring': [
    'error',
    {
      destructure: 'always',
    },
  ],
  // Require default values for optional props
  'vue/require-default-prop': 'error',
  // Enforce macro declaration order: options, model, props, emits, slots
  'vue/define-macros-order': [
    'error',
    {
      order: [
        'defineOptions',
        'defineModel',
        'defineProps',
        'defineEmits',
        'defineSlots',
      ],
      defineExposeLast: false, // Expose is part of public contract
    },
  ],
  // Disallow default boolean value for props (must default to false)
  'vue/no-boolean-default': [
    'error',
    'default-false',
  ],
};
