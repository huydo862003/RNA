import type {
  Rule,
} from 'eslint';

/**
 * Function names should begin with a verb so they clearly communicate action
 * This list covers the most common prefixes, add more via the rule's `allow` option
 */
const DEFAULT_VERB_PREFIXES = [
  'abort',
  'activate',
  'add',
  'apply',
  'are',
  'assert',
  'assign',
  'attach',
  'attempt',
  'batch',
  'bind',
  'blur',
  'build',
  'cache',
  'calculate',
  'cancel',
  'check',
  'clamp',
  'clean',
  'cleanup',
  'clear',
  'clone',
  'close',
  'compile',
  'compute',
  'configure',
  'connect',
  'convert',
  'copy',
  'create',
  'deactivate',
  'decode',
  'decrease',
  'decrement',
  'delete',
  'dequeue',
  'deselect',
  'deserialize',
  'detach',
  'diff',
  'disable',
  'dismiss',
  'dispatch',
  'do',
  'does',
  'download',
  'drag',
  'drop',
  'emit',
  'enable',
  'encode',
  'end',
  'enqueue',
  'ensure',
  'evaluate',
  'execute',
  'expect',
  'extend',
  'extract',
  'fetch',
  'filter',
  'find',
  'fire',
  'flush',
  'focus',
  'format',
  'generate',
  'get',
  'handle',
  'has',
  'hide',
  'import',
  'increment',
  'increase',
  'initialize',
  'inject',
  'insert',
  'intercept',
  'is',
  'iterate',
  'listen',
  'load',
  'lock',
  'make',
  'map',
  'match',
  'merge',
  'mount',
  'move',
  'navigate',
  'normalize',
  'notify',
  'observe',
  'on',
  'open',
  'parse',
  'patch',
  'pause',
  'pin',
  'poll',
  'pop',
  'prepare',
  'process',
  'provide',
  'push',
  'read',
  'reduce',
  'refresh',
  'register',
  'remove',
  'render',
  'reorder',
  'reset',
  'resize',
  'resolve',
  'retry',
  'revert',
  'run',
  'sanitize',
  'save',
  'scale',
  'scan',
  'scroll',
  'search',
  'select',
  'send',
  'serialize',
  'set',
  'setup',
  'show',
  'sort',
  'start',
  'stop',
  'subscribe',
  'swap',
  'sync',
  'throw',
  'toggle',
  'track',
  'transform',
  'traverse',
  'trigger',
  'try',
  'unbind',
  'undo',
  'unfocus',
  'unload',
  'unlock',
  'unmount',
  'unpin',
  'unregister',
  'unsubscribe',
  'unwrap',
  'update',
  'upload',
  'use',
  'validate',
  'verify',
  'watch',
  'wrap',
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
