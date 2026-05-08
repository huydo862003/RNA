import type {
  Rule,
} from 'eslint';

const REPLACEMENTS: Record<string, string> = {
  '\u2014': '-', // em dash
  '\u2013': '-', // en dash
  '\u2018': '\'', // left single quote
  '\u2019': '\'', // right single quote
  '\u201C': '"', // left double quote
  '\u201D': '"', // right double quote
  '\u2026': '...', // ellipsis
  '\u2192': '->', // right arrow
  '\u2190': '<-', // left arrow
  '\u21D2': '=>', // double right arrow
  '\u2260': '!=', // not equal
  '\u2264': '<=', // less than or equal
  '\u2265': '>=', // greater than or equal
  '\u00D7': '*', // multiplication sign
  '\u00F7': '/', // division sign
};

const SPECIAL_CHAR_REGEX = new RegExp(`[${Object.keys(REPLACEMENTS).join('')}]`, 'g');

/**
 * Custom ESLint rule to disallow characters that cannot be typed on a standard keyboard
 */
export const noSpecialCharactersRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow non-keyboard characters like em dash, smart quotes, arrows',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      noSpecialChar: 'Avoid non-keyboard character "{{ char }}", use "{{ replacement }}" instead',
    },
  },
  create (context) {
    const sourceCode = context.sourceCode;
    return {
      Program () {
        const text = sourceCode.getText();
        let match;
        while ((match = SPECIAL_CHAR_REGEX.exec(text)) !== null) {
          const char = match[0];
          const location = sourceCode.getLocFromIndex(match.index);
          context.report({
            loc: {
              start: location,
              end: {
                line: location.line,
                column: location.column + 1,
              },
            },
            messageId: 'noSpecialChar',
            data: {
              char,
              replacement: REPLACEMENTS[char],
            },
            fix (fixer) {
              return fixer.replaceTextRange(
                [
                  match!.index,
                  match!.index + 1,
                ],
                REPLACEMENTS[char],
              );
            },
          });
        }
      },
    };
  },
};
