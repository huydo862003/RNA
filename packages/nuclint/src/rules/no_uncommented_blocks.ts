import type {
  Rule,
} from 'eslint';

const DEFAULT_MAX_CONSECUTIVE_LINES = 25;

/**
 * Flags functions or arrow-function bodies containing a long run of consecutive statements without an intervening comment
 * Logic exceeding the threshold without comments is flagged as under-documented
 */
export const noUncommentedBlocksRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warn when a function body has a long run of statements with no intervening comment',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxConsecutiveLines: {
            type: 'number',
            description: 'Max consecutive uncommented code lines before a warning is emitted',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      addComment:
        '{{ count }} consecutive lines without a comment inside this function. '
        + 'Add a comment to explain the intent of this block',
    },
  },
  create (context) {
    const options = context.options[0] ?? {};
    const maxLines: number = options.maxConsecutiveLines ?? DEFAULT_MAX_CONSECUTIVE_LINES;
    const sourceCode = context.sourceCode;

    function checkFunctionBody (body: Rule.Node): void {
      if (!body.loc) return;

      const startLine = body.loc.start.line;
      const endLine = body.loc.end.line;

      if (endLine - startLine < maxLines) return;

      // Collect the line numbers of all comments inside the function body
      const commentLines = new Set<number>();

      for (const comment of sourceCode.getAllComments()) {
        if (!comment.loc) continue;

        const commentStart = comment.loc.start.line;
        const commentEnd = comment.loc.end.line;

        if (startLine <= commentStart && commentEnd <= endLine) {
          for (let line = commentStart; line <= commentEnd; line++) {
            commentLines.add(line);
          }
        }
      }

      // Walk the body line-by-line, breaking the run counter whenever a comment is encountered
      let runStart = startLine + 1;
      let longestRun = 0;
      let longestRunStart = startLine + 1;

      for (let line = startLine + 1; line <= endLine; line++) {
        if (!commentLines.has(line)) continue;

        const run = line - runStart;

        if (longestRun < run) {
          longestRun = run;
          longestRunStart = runStart;
        }

        runStart = line + 1;
      }

      // Account for the final stretch after the last comment (or the whole body if no comments)
      const finalRun = endLine - runStart;

      if (longestRun < finalRun) {
        longestRun = finalRun;
        longestRunStart = runStart;
      }

      if (maxLines < longestRun) {
        context.report({
          node: body,
          messageId: 'addComment',
          data: {
            count: longestRun,
          },
          loc: {
            line: longestRunStart,
            column: 0,
          },
        });
      }
    }

    // Check all function variants: declaration, expression, and arrow function
    return {
      FunctionDeclaration (node) {
        if (node.body) checkFunctionBody(node.body as unknown as Rule.Node);
      },
      FunctionExpression (node) {
        if (node.body) checkFunctionBody(node.body as unknown as Rule.Node);
      },
      ArrowFunctionExpression (node) {
        if (node.body.type === 'BlockStatement') {
          checkFunctionBody(node.body as unknown as Rule.Node);
        }
      },
    };
  },
};
