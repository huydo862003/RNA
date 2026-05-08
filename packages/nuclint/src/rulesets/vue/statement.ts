import type {
  Linter,
} from 'eslint';

/* Vue statement extension rules mirror statement.ts for <template> expressions */

export const vueStatementRules: Linter.RulesRecord = {
  // Enforce max line length of 200 characters, ignore HTML attribute values and text contents
  'vue/max-len': [
    'error',
    {
      code: 200,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: true,
    },
  ],
};
