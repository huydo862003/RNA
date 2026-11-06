import type {
  Rule,
} from 'eslint';

/**
 * Flags lines inside block comments (`/* ... *\/`) whose first word starts with a lowercase letter
 * Prose comments should read as sentences (capital first word)
 * A lowercase start is a strong signal the line is commented-out code rather than a description
 *
 * No auto-fix: the intent of the comment must be decided by the author
 */
function isAllowedContent (content: string): boolean {
  // Backtick code span: `someVar`
  if (/^`[^`]*`/u.test(content)) return true;
  // Well-known lowercase abbreviations: e.g. i.e. etc
  if (/^(?:e\.g\.|i\.e\.|etc\.)/u.test(content)) return true;
  // URLs: http/https links
  if (/^https?:\/\//u.test(content)) return true;
  // ESLint directives: eslint-disable, eslint-enable, etc
  if (/^eslint-/u.test(content)) return true;
  // Non-lowercase first char: symbols, digits, uppercase
  if (!/^[a-z]/u.test(content[0])) return true;
  // camelCase identifier: someVariable
  if (/^[a-z][a-z0-9]*[A-Z]/u.test(content)) return true;
  // kebab-case identifier: some-thing
  if (/^[a-z][a-z0-9]*-/u.test(content)) return true;
  // Definition line: `key = value` or `key: value`
  if (/^[a-z][a-zA-Z0-9]*\s*[=:]/u.test(content)) return true;

  return false;
}

export const noLowercaseBlockCommentRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Block comment lines must start with a capitalized word',
      recommended: true,
    },
    // Intentionally no `fixable` - author must decide the correct text
    messages: {
      capitalize:
        'Block comment line starts with a lowercase letter. '
        + 'Capitalize it, or convert to a line comment if it is code.',
    },
  },
  create (context) {
    return {
      Program () {
        for (const comment of context.sourceCode.getAllComments()) {
          if (comment.type !== 'Block') continue;

          const rawLines = comment.value.split('\n');

          // Track whether we are inside a ``` fenced code block
          let inFence = false;

          for (let lineOffset = 0; lineOffset < rawLines.length; lineOffset++) {
            const rawLine = rawLines[lineOffset];

            // Strip the leading `*` and surrounding whitespace (JSDoc / block style)
            const match = rawLine.match(/^(\s*\*?\s*)(.*)/u);

            if (!match) continue;

            const [
              , prefix,
              content,
            ] = match;

            if (!content) continue;

            // Toggle fence state on ``` markers and skip lines inside fenced blocks
            if (/^```/u.test(content)) {
              inFence = !inFence;
              continue;
            }

            if (inFence) continue;

            if (isAllowedContent(content)) continue;

            // Calculate the exact column of the offending character in the file
            const fileLine = (comment.loc?.start.line ?? 0) + lineOffset;
            const fileColumn = lineOffset === 0
              // `/*` is 2 chars, then `prefix` within the comment value
              ? (comment.loc?.start.column ?? 0) + 2 + prefix.length
              // For subsequent lines the prefix is from column 0
              : prefix.length;

            context.report({
              loc: {
                line: fileLine,
                column: fileColumn,
              },
              messageId: 'capitalize',
            });
          }
        }
      },
    };
  },
};
