import type {
  Linter,
} from 'eslint';

// Block rules enforce formatting of multi-line structures and newline placement
export const blockRules: Linter.RulesRecord = {
  // Enforce one true brace style for code blocks
  '@stylistic/brace-style': [
    'error',
    '1tbs',
  ],
  // Require consistent line breaks in function call arguments
  '@stylistic/function-call-argument-newline': [
    'error',
    'consistent',
  ],
  // Require line breaks for function parameters spanning multiple lines
  '@stylistic/function-paren-newline': [
    'error',
    'multiline-arguments',
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
  // Require semicolon delimiters in interface/type members with trailing semicolon in multiline
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    },
  ],
  // Require multiline ternary expressions to have breaks at each operator
  '@stylistic/multiline-ternary': [
    'error',
    'always-multiline',
  ],
  // Require line breaks between chained method calls at depth > 2
  '@stylistic/newline-per-chained-call': [
    'error',
    {
      ignoreChainWithDepth: 2,
    },
  ],
  // Disallow multiple consecutive empty lines
  '@stylistic/no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxEOF: 0,
    },
  ],
};
