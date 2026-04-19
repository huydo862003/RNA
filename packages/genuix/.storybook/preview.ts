import {
  type Preview,
  setup,
} from '@storybook/vue3-vite';
import '../src/style.css';
import 'floating-vue/style.css';
import {
  Dropdown, Menu, Tooltip, vClosePopper, vTooltip,
} from 'floating-vue';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Tokens',
          'Components',
        ],
      },
    },
    designToken: {
      files: {
        css: {
          'Primitives - Colors': 'src/tokens/primitives/base/color.css',
          'Primitives - Font Sizes': 'src/tokens/primitives/base/text.css',
          'Primitives - Line Heights': 'src/tokens/primitives/base/leading.css',
          'Primitives - Spacing': 'src/tokens/primitives/base/spacing.css',
          'Primitives - Sizing': 'src/tokens/primitives/base/sizing.css',
          'Primitives - Radius': 'src/tokens/primitives/base/radius.css',
          'Primitives - Z-Index': 'src/tokens/primitives/base/z-index.css',
          'Primitives - Animation': 'src/tokens/primitives/base/animation.css',
          'Semantic': 'src/tokens/semantic.css',
        },
      },
    },
  },
};
setup((app) => {
  app.directive('tooltip', vTooltip);
  app.directive('close-popper', vClosePopper);

  app.component('VDropdown', Dropdown);
  app.directive('VTooltip', Tooltip);
  app.directive('VMenu', Menu);
});

export default preview;
