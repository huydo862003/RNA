import type {
  Linter,
} from 'eslint';

// Statement rules enforce formatting at the statement level (line endings, indentation, etc)
export const statementRules: Linter.RulesRecord = {
  // Require newline at end of file
  '@stylistic/eol-last': [
    'error',
    'always',
  ],
  // Enforce 2-space indentation with special handling for ternary expressions
  '@stylistic/indent': [
    'error',
    2,
    {
      flatTernaryExpressions: true,
    },
  ],
  // Disallow trailing whitespace
  '@stylistic/no-trailing-spaces': 'error',
  // Require semicolons at end of statements
  '@stylistic/semi': [
    'error',
    'always',
  ],

  // Enforce max line length of 200 characters with exceptions for URLs and comments
  '@stylistic/max-len': [
    'error',
    {
      code: 200,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
    },
  ],
};
