import type { Linter } from 'eslint';

/* Expression rules enforce formatting and spacing within expressions, literals, and operators */

export const expressionRules: Linter.RulesRecord = {
  // Require parentheses around arrow function parameters for consistency
  '@stylistic/arrow-parens': ['error', 'always'],
  // Require trailing commas in multiline lists to reduce diff noise
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
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
  '@stylistic/quotes': ['error', 'single'],
  // Require space between function name and opening paren
  '@stylistic/space-before-function-paren': ['error', 'always'],
  // Prefer < and <= over > and >= for easier left-to-right reading
  'custom/prefer-less-than': 'error',
};
