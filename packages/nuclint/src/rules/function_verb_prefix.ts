import type {
  Rule,
} from 'eslint';

/**
 * Function names should begin with a verb so they clearly communicate action
 * This list covers the most common prefixes, add more via the rule's `allow` option
 */
const DEFAULT_VERB_PREFIXES = [
  'add',
  'apply',
  'build',
  'calculate',
  'cancel',
  'check',
  'clear',
  'clone',
  'close',
  'compute',
  'configure',
  'connect',
  'convert',
  'create',
  'decode',
  'delete',
  'deserialize',
  'disable',
  'dispatch',
  'emit',
  'enable',
  'encode',
  'execute',
  'extend',
  'fetch',
  'filter',
  'find',
  'fire',
  'format',
  'generate',
  'get',
  'handle',
  'has',
  'hide',
  'initialize',
  'insert',
  'is',
  'load',
  'make',
  'map',
  'merge',
  'mount',
  'normalize',
  'notify',
  'open',
  'parse',
  'prepare',
  'process',
  'push',
  'reduce',
  'refresh',
  'register',
  'remove',
  'render',
  'reset',
  'resolve',
  'run',
  'save',
  'search',
  'send',
  'serialize',
  'set',
  'setup',
  'show',
  'sort',
  'start',
  'stop',
  'subscribe',
  'toggle',
  'transform',
  'trigger',
  'unsubscribe',
  'update',
  'use',
  'validate',
  'watch',
];

function hasVerbPrefix (name: string, prefixes: string[]): boolean {
  const lower = name.charAt(0).toLowerCase() + name.slice(1);

  return prefixes.some((prefix) => {
    if (!lower.startsWith(prefix)) return false;

    // The character right after the prefix must be uppercase or the name must end exactly there
    // This prevents "getaway" from matching "get" (the char after is lowercase 'a')
    const nextChar = lower[prefix.length];

    return nextChar === undefined || /^[A-Z_]/u.test(nextChar);
  });
}

export const functionVerbPrefixRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce that named functions start with a verb prefix',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Additional verb prefixes to allow',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useVerb:
        'Function "{{ name }}" should start with a verb '
        + '(e.g. get, set, is, has, create, handle, ...)',
    },
  },
  create (context) {
    const options = context.options[0] ?? {};
    const extraPrefixes: string[] = options.allow ?? [];
    const prefixes = [
      ...DEFAULT_VERB_PREFIXES,
      ...extraPrefixes,
    ];

    function checkName (name: string | null | undefined, node: Rule.Node): void {
      if (!name) return;

      // Skip constructors, single-word identifiers that are whole words, and PascalCase (class-like)
      if (/^[A-Z]/u.test(name)) return;

      if (!hasVerbPrefix(name, prefixes)) {
        context.report({
          node,
          messageId: 'useVerb',
          data: {
            name,
          },
        });
      }
    }

    return {
      FunctionDeclaration (node) {
        checkName(node.id?.name, node as unknown as Rule.Node);
      },
      // Only check named function expressions assigned to variables
      VariableDeclarator (node) {
        if (
          node.init?.type === 'FunctionExpression'
          || node.init?.type === 'ArrowFunctionExpression'
        ) {
          const name = node.id.type === 'Identifier' ? node.id.name : null;

          checkName(name, node as unknown as Rule.Node);
        }
      },
    };
  },
};
