import type {
  Rule,
} from 'eslint';

/**
 * Custom ESLint rule to disallow heavy separator comments and inline dash separators
 * Flags: entire-line separator sequences, triple-dash, and double-dash with spaces
 */
export const noHeavyCommentsRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow heavy separator comments like // ------ and inline --- or -- dashes',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      noHeavyComment: 'Avoid heavy separator comments',
      noDashes: 'Avoid "{{ dashes }}" in comments; use prose instead',
      noSemicolon: 'Avoid semicolons in comments; they signal commented-out code',
    },
  },
  create (context) {
    const sourceCode = context.sourceCode;

    return {
      Program () {
        for (const comment of sourceCode.getAllComments()) {
          const text = comment.value.trim();

          // Entire comment is a repeated separator character sequence
          if (/^[-=*#~_/]{3,}$/u.test(text)) {
            context.report({
              loc: comment.loc ?? {
                start: {
                  line: 0,
                  column: 0,
                },
                end: {
                  line: 0,
                  column: 0,
                },
              },
              messageId: 'noHeavyComment',
              fix (fixer) {
                const token = sourceCode.getTokenAfter(comment, {
                  includeComments: false,
                });
                // Remove the comment and any trailing newline
                const range: [number, number] = token
                  ? [
                    comment.range?.[0] ?? 0,
                    token.range[0],
                  ]
                  : comment.range ?? [
                    0,
                    0,
                  ];

                return fixer.removeRange(range);
              },
            });

            continue;
          }

          // Inline triple-dash (not part of a longer sequence) or spaced double-dash used as separators
          const dashMatch = /(?<!-)---(?!-)|(^| )--( |$)/mu.exec(text);

          if (dashMatch) {
            context.report({
              loc: comment.loc ?? {
                start: {
                  line: 0,
                  column: 0,
                },
                end: {
                  line: 0,
                  column: 0,
                },
              },
              messageId: 'noDashes',
              data: {
                dashes: dashMatch[0].trim(),
              },
            });
          }

          // Semicolons in prose signal awkward punctuation
          // Strip backtick spans first so `foo();` does not trigger
          const textWithoutCode = text.replace(/`[^`]*`/gu, '');

          if (textWithoutCode.includes(';')) {
            context.report({
              loc: comment.loc ?? {
                start: {
                  line: 0,
                  column: 0,
                },
                end: {
                  line: 0,
                  column: 0,
                },
              },
              messageId: 'noSemicolon',
            });
          }
        }
      },
    };
  },
};
