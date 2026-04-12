import type {
  Linter,
} from 'eslint';

/* Expression rules enforce formatting and spacing within expressions, literals, and operators */

export const expressionRules: Linter.RulesRecord = {
  // Require parentheses around arrow function parameters for consistency
  '@stylistic/arrow-parens': [
    'error',
    'always',
  ],

  // Require trailing commas in multiline lists to reduce diff noise
  '@stylistic/comma-dangle': [
    'error',
    'always-multiline',
  ],

  // Require space after commas but not before
  '@stylistic/comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],

  // Enforce spacing around colons in object literals
  '@stylistic/key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
    },
  ],

  // Enforce single quotes for consistency
  '@stylistic/quotes': [
    'error',
    'single',
  ],

  // Require space between function name and opening paren
  '@stylistic/space-before-function-paren': [
    'error',
    'always',
  ],

  // Prefer < and <= over > and >= for easier left-to-right reading
  'custom/prefer-less-than': 'error',

  /* Enforce fields and separators ([]()) to be on different lines
   * e.g.
   * [
   *   a, b, c
   * ]
   * */
  '@stylistic/object-curly-newline': [
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
  '@stylistic/array-bracket-newline': [
    'error',
    'always',
  ],

  /* Disallow spaces after [, { and before ], } */
  '@stylistic/array-bracket-spacing': [
    'error',
    'never',
  ],
  '@stylistic/object-curly-spacing': [
    'error',
    'never',
  ],

  /* Enforce array and object fields to be on one line each */
  '@stylistic/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: false,
    },
  ],
  '@stylistic/array-element-newline': [
    'error',
    'always',
  ],
  // Require operators at beginning of line except for assignment operators
  '@stylistic/operator-linebreak': [
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

};
