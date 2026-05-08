import type {
  Rule,
} from 'eslint';

/**
 * Custom ESLint rule to enforce newlines in type literal braces
 * e.g. const a: { a: number; b: number } should have newlines after { and before }
 */
export const typeLiteralNewlineRule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce newlines inside type literal braces when there are members',
      recommended: true,
    },
    fixable: 'whitespace',
    messages: {
      newlineAfterOpen: 'Expected a line break after this opening brace',
      newlineBeforeClose: 'Expected a line break before this closing brace',
    },
  },
  create (context): Rule.RuleListener {
    const sourceCode = context.sourceCode;
    const listener: Record<string, (node: never) => void> = {
      TSTypeLiteral (node: Rule.Node & {
        members: Rule.Node[];
      }) {
        if (node.members.length === 0) return;

        const openBrace = sourceCode.getFirstToken(node)!;
        const closeBrace = sourceCode.getLastToken(node)!;
        const firstMember = node.members[0];
        const lastMember = node.members[node.members.length - 1];

        // Check newline after opening brace
        if (openBrace.loc.end.line === firstMember.loc!.start.line) {
          context.report({
            loc: openBrace.loc,
            messageId: 'newlineAfterOpen',
            fix (fixer) {
              return fixer.insertTextAfter(openBrace, '\n');
            },
          });
        }

        // Check newline before closing brace
        const lastToken = sourceCode.getLastToken(lastMember as Rule.Node)!;

        if (lastToken.loc.end.line === closeBrace.loc.start.line) {
          context.report({
            loc: closeBrace.loc,
            messageId: 'newlineBeforeClose',
            fix (fixer) {
              return fixer.insertTextBefore(closeBrace, '\n');
            },
          });
        }
      },
    };

    return listener as Rule.RuleListener;
  },
};
