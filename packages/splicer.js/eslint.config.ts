import {
  baseConfig,
} from '@hdnax/nuclint';

export default [
  {
    ignores: [
      'dist',
      'doc-dist',
      'node_modules',
    ],
  },
  ...baseConfig,
];
