import type {
  Linter,
} from 'eslint';
import tailwindPlugin from 'eslint-plugin-better-tailwindcss';
import {
  tailwindRules,
} from '../rulesets';

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
