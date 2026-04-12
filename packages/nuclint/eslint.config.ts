import {
  baseConfig,
} from './src/configs';

export {
  baseConfig, vueConfig,
} from './src/configs';

export default [
  ...baseConfig,
  {
    ignores: [
      '__tests__/fixtures',
    ],
  },
];
