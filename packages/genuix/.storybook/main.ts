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
    {
      name: 'storybook-design-token',
      options: {},
    },
    'storybook-addon-vue-slots',
    'storybook-dark-mode',
  ],
};

export default config;
