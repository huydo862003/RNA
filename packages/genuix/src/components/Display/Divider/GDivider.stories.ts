/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GDivider from './GDivider.vue';
import {
  GDividerOrientation,
} from './types';

const meta = {
  title: 'Components/Display/GDivider',
  tags: ['autodocs'],
  component: GDivider,
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.values(GDividerOrientation),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GDivider />',
      },
    },
  },
  render: () => ({
    components: {
      GDivider,
    },
    template: `
      <div class="flex flex-col gap-md w-80">
        <p class="gui-neutral-fg-muted text-sm">Above the divider</p>
        <GDivider />
        <p class="gui-neutral-fg-muted text-sm">Below the divider</p>
      </div>
    `,
  }),
};

export const WithLabelStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GDivider>OR</GDivider>',
      },
    },
  },
  render: () => ({
    components: {
      GDivider,
    },
    template: `
      <div class="flex flex-col gap-md w-80">
        <p class="gui-neutral-fg-muted text-sm">Sign in with email</p>
        <GDivider>OR</GDivider>
        <p class="gui-neutral-fg-muted text-sm">Continue with SSO</p>
      </div>
    `,
  }),
};

export const VerticalStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GDivider orientation="vertical" />',
      },
    },
  },
  render: () => ({
    components: {
      GDivider,
    },
    setup () {
      return {
        GDividerOrientation,
      };
    },
    template: `
      <div class="flex items-center gap-md h-8">
        <span class="gui-neutral-fg-muted text-sm">Home</span>
        <GDivider :orientation="GDividerOrientation.Vertical" />
        <span class="gui-neutral-fg-muted text-sm">About</span>
        <GDivider :orientation="GDividerOrientation.Vertical" />
        <span class="gui-neutral-fg-muted text-sm">Contact</span>
      </div>
    `,
  }),
};
