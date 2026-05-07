import type {
  Rule,
} from 'eslint';

/**
 * Custom ESLint rule to disallow import aliases (import { foo as bar })
 * Allows aliases that only add or trim a leading underscore
 */
export const noImportAliasRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow import aliases except for adding/trimming leading _',
      recommended: true,
    },
    messages: {
      noAlias: 'Import aliases are not allowed, use the original name "{{ name }}"',
    },
  },
  create (context) {
    return {
      ImportSpecifier (node) {
        const imported = node.imported.type === 'Identifier'
          ? node.imported.name
          : String(node.imported.value);
        const local = node.local.name;
        if (imported === local) return;

        // Allow adding or trimming a leading _
        const isUnderscoreAlias =
          local === `_${imported}` || imported === `_${local}`;
        if (isUnderscoreAlias) return;

        context.report({
          node,
          messageId: 'noAlias',
          data: {
            name: imported,
          },
        });
      },
    };
  },
};
