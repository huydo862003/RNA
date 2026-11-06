import type {
  Linter,
} from 'eslint';
import tailwindPlugin from 'eslint-plugin-better-tailwindcss';
import {
  tailwindRules,
} from '../rulesets';

// Config factory named for the technology it configures, not a verb-prefixed action
// eslint-disable-next-line custom/function-verb-prefix
export function tailwindConfig (entryPoint: string): Linter.Config[] {
  return [
    {
      plugins: {
        'better-tailwindcss': tailwindPlugin,
      },
      settings: {
        'better-tailwindcss': {
          entryPoint,
        },
      },
      rules: {
        ...tailwindRules,
      },
    },
  ];
}
