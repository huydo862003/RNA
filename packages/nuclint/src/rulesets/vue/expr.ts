import type {
  Linter,
} from 'eslint';

/* Vue expression extension rules mirror expr.ts for <template> expressions */

export const vueExprRules: Linter.RulesRecord = {
  // Require spaces before and after arrow in arrow functions
  'vue/arrow-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],
  // Require trailing commas in multiline lists
  'vue/comma-dangle': [
    'error',
    'always-multiline',
  ],
  // Require space after commas but not before
  'vue/comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  // Enforce spacing around colons in object literals
  'vue/key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
    },
  ],
  // Enforce fields and separators to be on different lines
  'vue/object-curly-newline': [
    'error',
    {
      ObjectExpression: {
        multiline: true,
        minProperties: 1,
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 1,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 1,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 1,
      },
    },
  ],
  // Enforce newlines in array brackets
  'vue/array-bracket-newline': [
    'error',
    {
      multiline: true,
      minItems: 2,
    },
  ],
  // Disallow spaces inside array brackets
  'vue/array-bracket-spacing': [
    'error',
    'never',
  ],
  // Require spaces inside object curly braces, except empty objects
  'vue/object-curly-spacing': [
    'error',
    'always',
    {
      emptyObjects: 'never',
    },
  ],
  // Enforce each object property on its own line
  'vue/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: false,
    },
  ],
  // Enforce each array element on its own line
  'vue/array-element-newline': [
    'error',
    'always',
  ],
  // Require operators at beginning of line except for assignments
  'vue/operator-linebreak': [
    'error',
    'before',
    {
      overrides: {
        '=': 'after',
        '+=': 'after',
        '-=': 'after',
      },
    },
  ],
  // Disallow spaces between function name and parentheses in function calls
  'vue/func-call-spacing': [
    'error',
    'never',
  ],
};
