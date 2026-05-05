/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GAvatar from './GAvatar.vue';
import {
  GAvatarShape,
} from './types';
import {
  GSize,
} from '@/types';

const meta = {
  title: 'Components/Display/GAvatar',
  tags: ['autodocs'],
  component: GAvatar,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(GSize),
    },
    shape: {
      control: 'select',
      options: Object.values(GAvatarShape),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImageStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GAvatar label="Alice">
  <img src="https://i.pravatar.cc/150?u=alice" alt="Alice" />
</GAvatar>`,
      },
    },
  },
  render: () => ({
    components: {
      GAvatar,
    },
    template: `
      <div class="flex items-center gap-sm">
        <GAvatar label="Alice"><img src="https://i.pravatar.cc/150?u=alice" alt="Alice" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="Bob"><img src="https://i.pravatar.cc/150?u=bob" alt="Bob" class="w-full h-full object-cover" /></GAvatar>
      </div>
    `,
  }),
};

export const WithTextStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAvatar label="Alice Johnson">AJ</GAvatar>',
      },
    },
  },
  render: () => ({
    components: {
      GAvatar,
    },
    template: `
      <div class="flex items-center gap-sm">
        <GAvatar label="Alice Johnson" class="gui-info-bg-hover gui-info-fg">AJ</GAvatar>
        <GAvatar label="Bob Smith" class="gui-success-bg-hover gui-success-fg">BS</GAvatar>
        <GAvatar label="Carol" class="gui-warning-bg-hover gui-warning-fg">C</GAvatar>
      </div>
    `,
  }),
};

export const WithEmojiStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAvatar>🦊</GAvatar>',
      },
    },
  },
  render: () => ({
    components: {
      GAvatar,
    },
    template: `
      <div class="flex items-center gap-sm">
        <GAvatar>🦊</GAvatar>
        <GAvatar>👤</GAvatar>
        <GAvatar>🌍</GAvatar>
      </div>
    `,
  }),
};

export const SizesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAvatar :size="GSize.Md">MD</GAvatar>',
      },
    },
  },
  render: () => ({
    components: {
      GAvatar,
    },
    setup () {
      return {
        GSize,
      };
    },
    template: `
      <div class="flex items-end gap-sm">
        <GAvatar :size="GSize.Xs">XS</GAvatar>
        <GAvatar :size="GSize.Sm">SM</GAvatar>
        <GAvatar :size="GSize.Md">MD</GAvatar>
        <GAvatar :size="GSize.Lg">LG</GAvatar>
        <GAvatar :size="GSize.Xl">XL</GAvatar>
      </div>
    `,
  }),
};

export const ShapesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAvatar :shape="GAvatarShape.Circle">AB</GAvatar>',
      },
    },
  },
  render: () => ({
    components: {
      GAvatar,
    },
    setup () {
      return {
        GAvatarShape,
      };
    },
    template: `
      <div class="flex items-center gap-sm">
        <GAvatar :shape="GAvatarShape.Circle" class="gui-info-bg-hover gui-info-fg">AB</GAvatar>
        <GAvatar :shape="GAvatarShape.Square" class="gui-info-bg-hover gui-info-fg">AB</GAvatar>
        <GAvatar :shape="GAvatarShape.Circle"><img src="https://i.pravatar.cc/150?u=shape" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar :shape="GAvatarShape.Square"><img src="https://i.pravatar.cc/150?u=shape" class="w-full h-full object-cover" /></GAvatar>
      </div>
    `,
  }),
};
