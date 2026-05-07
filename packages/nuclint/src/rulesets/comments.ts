import type {
  Linter,
} from 'eslint';

// Comment rules enforce lightweight, consistent comment style
export const commentRules: Linter.RulesRecord = {
  // Disallow heavy separator comments like // ------
  'custom/no-heavy-comments': 'error',
  // Disallow comments ending with a period
  'custom/no-trailing-period-comments': 'error',
};
