import type {
  Rule,
  Scope,
} from 'eslint';
import type {
  Identifier,
} from 'estree';
import {
  abbreviations,
  allowList,
} from './abbreviations';

// Mirrors unicorn's word-boundary split: split before non-lowercase or after non-letter
const WORD_SPLIT_REGEX = /(?=\P{Lowercase_Letter})|(?<=\P{Letter})/u;

const declarationTypes = new Set([
  'FunctionDeclaration',
  'ClassDeclaration',
  'TSTypeAliasDeclaration',
  'TSInterfaceDeclaration',
  'TSEnumDeclaration',
]);

export interface NoAbbreviationOptions {
  /**
   * When true, only exported names are checked
   * When false, exported names are skipped
   */
  exported: boolean;
}

/**
 * Returns the first bad word found in `name` and its suggested replacement
 * Returns null when no abbreviations are detected
 */
function checkName (name: string): {
  word: string;
  replacement: string;
} | null {
  // Allow ALL_CAPS constants and names in the allow list
  if (name === name.toUpperCase() || allowList.has(name)) return null;

  // Exact check
  const exactReplacement = getWordReplacement(name);

  if (exactReplacement !== null) {
    return {
      word: name,
      replacement: exactReplacement,
    };
  }

  // Pure lowercase has no camelCase splits, the exact check above already covered it
  if (/^[a-z]+$/u.test(name)) return null;

  // Split on camelCase / PascalCase / symbol boundaries (same as unicorn)
  const words = name.split(WORD_SPLIT_REGEX).filter(Boolean);

  for (const word of words) {
    const replacement = getWordReplacement(word);

    if (replacement !== null) {
      return {
        word,
        replacement,
      };
    }
  }

  return null;
}

function getWordReplacement (word: string): string | null {
  const lower = word.charAt(0).toLowerCase() + word.slice(1);
  const hit = abbreviations[lower] ?? abbreviations[word];

  return hit === undefined || hit === false ? null : hit;
}

/**
 * Returns true if the identifier is the publicly exported name of a declaration
 * Mirrors the unicorn `isExportedIdent` check
 */
function isExportedIdent (nameNode: Identifier): boolean {
  const parent = (nameNode as unknown as {
    parent?: {
      type: string;
      id?: unknown;
      parent?: {
        type: string;
        parent?: {
          type: string;
        };
      };
    };
  }).parent;

  if (!parent) return false;

  // Variable case: `export const foo = ...`
  if (parent.type === 'VariableDeclarator' && parent.id === nameNode) {
    return (
      parent.parent?.type === 'VariableDeclaration'
      && parent.parent?.parent?.type === 'ExportNamedDeclaration'
    );
  }

  if (declarationTypes.has(parent.type) && parent.id === nameNode) {
    return parent.parent?.type === 'ExportNamedDeclaration';
  }

  return false;
}

function processScope (scope: Scope.Scope, onVariable: (variable: Scope.Variable) => void): void {
  for (const variable of scope.variables) {
    onVariable(variable);
  }

  for (const child of scope.childScopes) {
    processScope(child, onVariable);
  }
}

/**
 * Shared rule module used under two registrations:
 *   - `custom/no-abbreviation`        -> `['error', { exported: false }]`
 *   - `custom/no-public-abbreviation` -> `['warn',  { exported: true  }]`
 */
export const noAbbreviationRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow abbreviations in variable and function names. '
        + 'Registered twice: once for internal names (error) and once for exported names (warn).',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          exported: {
            type: 'boolean',
            description:
              'When true, only exported identifiers are checked. '
              + 'When false (default), exported identifiers are skipped.',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useFullName:
        'The name "{{ name }}" contains the abbreviation "{{ word }}". '
        + 'Use "{{ replacement }}" instead.',
    },
  },
  create (context) {
    const options: NoAbbreviationOptions = context.options[0] ?? {
      exported: false,
    };
    const checkExported = options.exported;

    // Walk every scope variable in the program and check its name
    return {
      'Program:exit' (program) {
        const rootScope = context.sourceCode.getScope(program);

        processScope(rootScope, (variable) => {
          if (variable.defs.length === 0) return;

          const [definition] = variable.defs;

          // Skip import bindings from external packages: the import name is
          // determined by the external module and cannot be changed locally
          if (
            definition.type === 'ImportBinding'
            && !(definition.parent as {
              source: {
                value: string;
              };
            }).source.value.startsWith('.')
          ) return;

          const nameNode = definition.name as Identifier;
          const exported = isExportedIdent(nameNode);

          // Only check the category this rule instance is responsible for
          if (checkExported ? !exported : exported) return;

          const result = checkName(variable.name);

          if (!result) return;

          context.report({
            node: nameNode,
            messageId: 'useFullName',
            data: {
              name: variable.name,
              word: result.word,
              replacement: result.replacement,
            },
          });
        });
      },
    };
  },
};
