import {
  baseConfig,
} from '@hdnax/nuclint';

export default [
  {
    ignores: [
      'dist',
      'node_modules',
    ],
  },
  ...baseConfig,
];
