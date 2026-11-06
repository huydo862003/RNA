import type {
  Rule,
} from 'eslint';

/**
 * Disallows `export * from '...'` and `export * as foo from '...'`
 * Barrel re-exports hurt tree-shaking and make it hard to trace where a symbol comes from
 */
export const noExportStarRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow export * (wildcard re-exports)',
      recommended: true,
    },
    messages: {
      noExportStar:
        'Wildcard re-exports (`export * from`) are not allowed. '
        + 'Explicitly list the names you want to re-export.',
    },
  },
  create (context) {
    return {
      ExportAllDeclaration (node) {
        context.report({
          node,
          messageId: 'noExportStar',
        });
      },
    };
  },
};
