import type {
  Rule,
} from 'eslint';

/**
 * Disallows trailing periods on comment lines and multiple sentences on one line
 */
export const noTrailingPeriodCommentsRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow trailing periods and multiple sentences per comment line',
      recommended: true,
    },
    messages: {
      noTrailingPeriod: 'Comments should not end with a period',
      noMultiSentence: 'Put each sentence on its own line',
    },
  },
  create (context) {
    const sourceCode = context.sourceCode;

    function getLineContent (raw: string): string {
      // Strip leading JSDoc-style `*` prefix
      return raw.replace(/^\s*\*?\s*/u, '');
    }

    function checkLine (content: string, fileLine: number, fileColumn: number): void {
      const trimmed = content.trimEnd();

      if (!trimmed) return;

      // Multiple sentences: a period followed by a space and an uppercase letter
      if (/\.\s+[A-Z]/u.test(trimmed)) {
        context.report({
          loc: {
            line: fileLine,
            column: fileColumn,
          },
          messageId: 'noMultiSentence',
        });

        return;
      }

      // Trailing period
      if (trimmed.endsWith('.')) {
        context.report({
          loc: {
            line: fileLine,
            column: fileColumn + trimmed.length - 1,
          },
          messageId: 'noTrailingPeriod',
        });
      }
    }

    return {
      Program () {
        for (const comment of sourceCode.getAllComments()) {
          if (comment.type === 'Line') {
            const content = comment.value;
            const fileLine = comment.loc?.start.line ?? 1;
            const fileColumn = (comment.loc?.start.column ?? 0) + 2;

            checkLine(content, fileLine, fileColumn);
          } else {
            // Block comment: check each line individually
            const rawLines = comment.value.split('\n');

            for (let offset = 0; offset < rawLines.length; offset++) {
              const content = getLineContent(rawLines[offset]);
              const fileLine = (comment.loc?.start.line ?? 1) + offset;
              const fileColumn = offset === 0
                ? (comment.loc?.start.column ?? 0) + 2
                : 0;

              checkLine(content, fileLine, fileColumn);
            }
          }
        }
      },
    };
  },
};
