import type {
  Linter,
} from 'eslint';

// Type safety rules enforce correct usage of TypeScript types and prevent unsafe patterns
export const typeSafetyRules: Linter.RulesRecord = {
  // Prefer type imports over value imports to avoid circular dependencies and reduce bundle size
  '@typescript-eslint/consistent-type-imports': 'error',
  // Disallow unused variables, but allow those prefixed with _ to indicate intentional non-use
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  // Enforce interface over type for object definitions for consistency and better error messages
  '@typescript-eslint/consistent-type-definitions': [
    'error',
    'interface',
  ],
  // Disallow explicit any type to maintain type safety
  '@typescript-eslint/no-explicit-any': 'error',
  // Disallow non-null assertions to encourage proper null checks
  '@typescript-eslint/no-non-null-assertion': 'error',
};
