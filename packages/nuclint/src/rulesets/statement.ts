import type { Linter } from 'eslint';

// Statement rules enforce formatting at the statement level (line endings, indentation, etc)
export const statementRules: Linter.RulesRecord = {
  // Require newline at end of file
  '@stylistic/eol-last': ['error', 'always'],
  // Enforce 2-space indentation with special handling for ternary expressions
  '@stylistic/indent': [
    'error',
    2,
    { flatTernaryExpressions: true },
  ],
  // Disallow trailing whitespace
  '@stylistic/no-trailing-spaces': 'error',
  // Require semicolons at end of statements
  '@stylistic/semi': ['error', 'always'],
  // Require space before opening brace of a code block
  '@stylistic/space-before-blocks': ['error', 'always'],
};
