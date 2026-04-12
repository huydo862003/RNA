import type {
  Linter,
} from 'eslint';

// Import rules enforce best practices for module imports and dependencies
export const importRules: Linter.RulesRecord = {
  // Require `node:` prefix for Node.js built-in imports
  'n/prefer-node-protocol': 'error',
  // Require imports to come first in the file before other code
  'import/first': 'error',
  // Verify that all named imports are defined in the imported module
  'import/named': 'error',
  // Require blank line after import statements
  'import/newline-after-import': 'error',
  // Warn on circular dependencies between modules
  'import/no-cycle': 'warn',
  // Warn when importing deprecated modules
  'import/no-deprecated': 'warn',
  // Disallow duplicate import statements of the same module
  'import/no-duplicates': 'error',
  // Disallow importing a module from itself
  'import/no-self-import': 'error',
  // Warn when modules are never used
  'import/no-unused-modules': 'warn',
  // No limit on number of dependencies
  'import/max-dependencies': 'off',
  // Enforce consistent import ordering: builtin, external, internal, parent, sibling, index
  'import/order': [
    'error',
    {
      'newlines-between': 'never',
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
    },
  ],
};
