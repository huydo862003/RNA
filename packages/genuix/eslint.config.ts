import config from '@hdnax/nuclint';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'doc-dist',
      'storybook-static',
    ],
  },
  ...config,
];
