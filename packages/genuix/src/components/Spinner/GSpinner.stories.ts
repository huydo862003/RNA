/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GSpinner from './GSpinner.vue';
import {
  SpinnerSize,
  SpinnerSpeed,
} from './types';

const meta = {
  title: 'Components/GSpinner',
  tags: ['autodocs'],
  component: GSpinner,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SpinnerSize),
      description: 'Spinner size',
    },
    speed: {
      control: 'select',
      options: Object.values(SpinnerSpeed),
      description: 'Spin speed',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: {
    GSpinner,
  },
  setup () {
    return {
      args,
    };
  },
  template: `
    <GSpinner v-bind="args" />
  `,
});

export const DefaultSpinnerStory: Story = {
  args: {
    size: SpinnerSize.Md,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default medium spinner',
      },
    },
  },
  render,
};

export const AllSizesSpinnerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All sizes side by side',
      },
    },
  },
  render: () => ({
    components: {
      GSpinner,
    },
    setup () {
      return {
        sizes: Object.values(SpinnerSize),
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <GSpinner v-for="s in sizes" :key="s" :size="s" />
      </div>
    `,
  }),
};

export const AllSpeedsSpinnerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All speeds side by side',
      },
    },
  },
  render: () => ({
    components: {
      GSpinner,
    },
    setup () {
      return {
        speeds: Object.values(SpinnerSpeed),
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <div v-for="s in speeds" :key="s" class="flex flex-col items-center gap-spacing-1">
          <GSpinner :speed="s" />
          <span class="text-xs gui-neutral-fg-muted">{{ s }}</span>
        </div>
      </div>
    `,
  }),
};

export const ColoredSpinnerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spinner inherits color from parent',
      },
    },
  },
  render: () => ({
    components: {
      GSpinner,
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <GSpinner class="gui-primary-fg" />
        <GSpinner class="gui-danger-fg" />
        <GSpinner class="gui-success-fg" />
        <GSpinner class="gui-info-fg" />
        <GSpinner class="gui-warning-fg" />
        <GSpinner class="gui-notice-fg" />
      </div>
    `,
  }),
};
