import type {
  Linter,
} from 'eslint';

/* Vue template rules enforce HTML and template best practices */

export const vueTemplateRules: Linter.RulesRecord = {
  // Require type attribute on <button> elements
  'vue/html-button-has-type': [
    'error',
    {
      button: true,
      submit: true,
      reset: true,
    },
  ],
  // Enforce "in" delimiter in v-for
  'vue/v-for-delimiter-style': [
    'error',
    'in',
  ],
  // Require key attribute on v-if/v-else-if/v-else siblings
  'vue/v-if-else-key': 'error',
  // Enforce method or inline-function handler style on v-on
  'vue/v-on-handler-style': [
    'error',
    [
      'method',
      'inline-function',
    ],
    {
      'ignoreIncludesComment': false,
    },
  ],
  // Prefer shorthand for true boolean attributes
  'vue/prefer-true-attribute-shorthand': 'error',
  // Disallow useless mustache interpolations
  'vue/no-useless-mustaches': 'error',
  // Disallow unnecessary v-bind
  'vue/no-useless-v-bind': 'error',
  // Disallow v-text directive, use mustache instead
  'vue/no-v-text': 'error',
  // Prefer boolean type listed first in union prop types
  'vue/prefer-prop-type-boolean-first': 'error',
  // Prefer separate static class attribute over mixed dynamic/static
  'vue/prefer-separate-static-class': 'error',
  // Disallow inline styles in templates
  'vue/no-static-inline-styles': [
    'error',
    {
      'allowBinding': false,
    },
  ],
  // Disallow target="_blank" without rel="noopener"
  'vue/no-template-target-blank': 'error',
  // Require spaces inside HTML comments
  'vue/html-comment-content-spacing': [
    'error',
    'always',
  ],
  // Enforce 2-space indent in HTML comments
  'vue/html-comment-indent': [
    'error',
    2,
  ],
  // Disallow duplicate class names in templates
  'vue/no-duplicate-class-names': 'warn',
  // Allow only one object in template class bindings
  'vue/no-multiple-objects-in-class': 'error',
  // Disallow duplicate attribute inheritance across multi-root nodes
  'vue/no-duplicate-attr-inheritance': [
    'error',
    {
      'checkMultiRootNodes': true,
    },
  ],
};
