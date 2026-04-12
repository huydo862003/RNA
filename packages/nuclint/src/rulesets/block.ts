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

  // Require space before opening brace of a code block
  '@stylistic/space-before-blocks': [
    'error',
    'always',
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

  '@stylistic/block-spacing': [
    'error',
    'always',
  ],
};
