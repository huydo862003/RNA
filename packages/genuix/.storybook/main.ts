import type {
  StorybookConfig,
} from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  framework: '@storybook/vue3-vite',
  addons: [
    '@storybook/addon-docs',
    'storybook-design-token',
  ],
};

export default config;
