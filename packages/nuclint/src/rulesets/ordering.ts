import type {
  Linter,
} from 'eslint';

// Ordering rules enforce consistent declaration order within modules
export const orderingRules: Linter.RulesRecord = {
  // Sort module-level declarations: exports first, then non-exports
  'perfectionist/sort-modules': [
    'error',
    {
      type: 'natural',
      groups: [
        // Public types/interfaces
        [
          'declare-enum',
          'export-enum',
        ],
        [
          'declare-interface',
          'declare-type',
          'export-interface',
          'export-type',
        ],
        // Public classes
        [
          'declare-class',
          'export-class',
        ],
        // Public functions
        'export-function',
        // Private types/interfaces
        'enum',
        [
          'interface',
          'type',
        ],
        // Private classes
        'class',
        // Private functions
        'function',
      ],
    },
  ],
};
