import type {
  Rule,
} from 'eslint';

/**
 * Custom ESLint rule to disallow heavy separator comments
 * like // ------, // ======, // ******
 */
export const noHeavyCommentsRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow heavy separator comments like // ------',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      noHeavyComment: 'Avoid heavy separator comments',
    },
  },
  create (context) {
    const sourceCode = context.sourceCode;
    return {
      Program () {
        for (const comment of sourceCode.getAllComments()) {
          const text = comment.value.trim();
          // Match at-least-3 repeated separator characters
          if (/^[-=*#~_/]{3,}$/.test(text)) {
            context.report({
              loc: comment.loc!,
              messageId: 'noHeavyComment',
              fix (fixer) {
                const token = sourceCode.getTokenAfter(comment, { includeComments: false });
                // Remove the comment and any trailing newline
                const range: [number, number] = token
                  ? [comment.range![0], token.range[0]]
                  : comment.range!;
                return fixer.removeRange(range);
              },
            });
          }
        }
      },
    };
  },
};
