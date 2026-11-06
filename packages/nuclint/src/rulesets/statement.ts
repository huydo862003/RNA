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

  // Warn on functions with high cyclomatic complexity (too many branching paths)
  'complexity': [
    'warn',
    {
      max: 15,
    },
  ],
  // Limit nesting depth (deep nesting signals a need for early returns or extracted functions)
  'max-depth': [
    'warn',
    4,
  ],
  // Limit number of function parameters (too many params signals a need for an options object)
  'max-params': [
    'warn',
    {
      max: 4,
    },
  ],
  // Remove else after return/throw to encourage early-return / guard-clause pattern
  'no-else-return': [
    'error',
    {
      allowElseIf: false,
    },
  ],
  // Merge lone `if` inside `else` into `else if` for flatter control flow
  'no-lonely-if': 'error',
  // Warn on long functions (keeps logic digestible and testable)
  'max-lines-per-function': [
    'warn',
    {
      max: 80,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  // Enforce max line length of 200 characters, not applied to comments, strings, URLs, or regexes
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
