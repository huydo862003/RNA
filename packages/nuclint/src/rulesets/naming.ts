import type {
  Linter,
} from 'eslint';

// Naming rules enforce readable, non-abbreviated variable and parameter names
export const namingRules: Linter.RulesRecord = {
  // Disallow abbreviations in internal (non-exported) names - auto-fixable
  'custom/no-abbreviation': [
    'error',
    {
      exported: false,
    },
  ],
  // Warn when exported (public API) names contain abbreviations
  // Cannot auto-fix without a breaking change, so this is advisory only
  'custom/no-public-abbreviation': [
    'warn',
    {
      exported: true,
    },
  ],
  // Disabled in favour of the two custom rules above, which differentiate
  // between internal names (error) and exported names (warn)
  'unicorn/name-replacements': 'off',
  'unicorn/prevent-abbreviations': 'off',
  // Enforce that named functions start with a verb prefix (get, set, is, handle, ...)
  'custom/function-verb-prefix': 'warn',
  // Disallow single-character variable names for readability
  'id-length': [
    'error',
    {
      min: 2,
      properties: 'never',
      exceptions: [
        '_',
        'n',
      ],
    },
  ],
};
