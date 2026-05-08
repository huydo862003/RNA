import type {
  Linter,
} from 'eslint';

/* Vue strict rules are template equivalents of core JS rules */

export const vueStrictRules: Linter.RulesRecord = {
  // Require === and !== instead of == and !=
  'vue/eqeqeq': [
    'error',
    'always',
  ],
  // Disallow console.log in templates
  'vue/no-console': 'error',
  // Disallow constant conditions in template expressions
  'vue/no-constant-condition': 'error',
  // Disallow empty destructuring patterns
  'vue/no-empty-pattern': 'error',
  // Disallow type coercion shortcuts like !!value or +string
  'vue/no-implicit-coercion': 'error',
  // Disallow number literals that lose precision
  'vue/no-loss-of-precision': 'error',
  // Disallow sparse arrays like [1,,3]
  'vue/no-sparse-arrays': 'error',
  // Disallow unnecessary string concatenation like "a" + "b"
  'vue/no-useless-concat': 'error',
  // Disallow negated conditions when else branch exists
  'vue/no-negated-condition': 'error',
  // Require dot notation for property access when possible
  'vue/dot-notation': 'error',
  // Require shorthand for object methods and properties
  'vue/object-shorthand': [
    'error',
    'always',
  ],
  // Require template literals instead of string concatenation
  'vue/prefer-template': 'error',
};
