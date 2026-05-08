import type {
  Linter,
} from 'eslint';

// Tailwind CSS rules enforce consistent class usage and ordering
export const tailwindRules: Linter.RulesRecord = {
  // Enforce consistent ordering of Tailwind CSS classes
  'better-tailwindcss/enforce-consistent-class-order': 'error',
  // Enforce consistent ordering of variants (e.g. hover:, focus:)
  'better-tailwindcss/enforce-consistent-variant-order': 'error',
  // Enforce shorthand classes (e.g. mx-2 instead of ml-2 mr-2)
  'better-tailwindcss/enforce-shorthand-classes': 'error',
  // Enforce canonical class names
  'better-tailwindcss/enforce-canonical-classes': 'error',
  // Disallow conflicting classes (e.g. p-2 p-4)
  'better-tailwindcss/no-conflicting-classes': 'error',
  // Disallow duplicate classes
  'better-tailwindcss/no-duplicate-classes': 'error',
  // Disallow deprecated Tailwind classes
  'better-tailwindcss/no-deprecated-classes': 'error',
  // Warn on unknown Tailwind classes (custom component classes are common)
  'better-tailwindcss/no-unknown-classes': 'warn',
  // Disallow unnecessary whitespace in class strings
  'better-tailwindcss/no-unnecessary-whitespace': 'error',
};
