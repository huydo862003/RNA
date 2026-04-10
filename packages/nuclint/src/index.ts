import type { Linter } from 'eslint';
import {
  baseConfig,
  vueConfig,
} from './configs';

export const config: Linter.Config[] = [...baseConfig, ...vueConfig];

export default config;
