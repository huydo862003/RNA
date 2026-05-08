import type {
  Rule,
} from 'eslint';

/**
 * Custom ESLint rule to disallow comments ending with a period
 */
export const noTrailingPeriodCommentsRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow comments ending with a period',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      noTrailingPeriod: 'Comments should not end with a period',
    },
  },
  create (context) {
    const sourceCode = context.sourceCode;
    return {
      Program () {
        for (const comment of sourceCode.getAllComments()) {
          const text = comment.value.trimEnd();
          if (text.endsWith('.')) {
            context.report({
              loc: comment.loc!,
              messageId: 'noTrailingPeriod',
              fix (fixer) {
                // Find the last period and remove it
                const commentEnd = comment.range![1];
                const offset = comment.value.length - text.length;
                const periodPosition = commentEnd - 1 - offset - (comment.type === 'Block' ? 2 : 0);
                return fixer.removeRange([
                  periodPosition,
                  periodPosition + 1,
                ]);
              },
            });
          }
        }
      },
    };
  },
};
