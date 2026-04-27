/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GAvatar from './GAvatar.vue';
import {
  AvatarShape,
} from './types';
import {
  Size,
} from '@/types';

const meta = {
  title: 'Components/Display/GAvatar',
  tags: ['autodocs'],
  component: GAvatar,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    shape: {
      control: 'select',
      options: Object.values(AvatarShape),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImageStory: Story = {
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
  render: () => ({
    components: {
      GAvatar,
    },
    setup () {
      return {
        Size,
      };
    },
    template: `
      <div class="flex items-end gap-sm">
        <GAvatar :size="Size.Xs">XS</GAvatar>
        <GAvatar :size="Size.Sm">SM</GAvatar>
        <GAvatar :size="Size.Md">MD</GAvatar>
        <GAvatar :size="Size.Lg">LG</GAvatar>
        <GAvatar :size="Size.Xl">XL</GAvatar>
      </div>
    `,
  }),
};

export const ShapesStory: Story = {
  render: () => ({
    components: {
      GAvatar,
    },
    setup () {
      return {
        AvatarShape,
      };
    },
    template: `
      <div class="flex items-center gap-sm">
        <GAvatar :shape="AvatarShape.Circle" class="gui-info-bg-hover gui-info-fg">AB</GAvatar>
        <GAvatar :shape="AvatarShape.Square" class="gui-info-bg-hover gui-info-fg">AB</GAvatar>
        <GAvatar :shape="AvatarShape.Circle"><img src="https://i.pravatar.cc/150?u=shape" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar :shape="AvatarShape.Square"><img src="https://i.pravatar.cc/150?u=shape" class="w-full h-full object-cover" /></GAvatar>
      </div>
    `,
  }),
};
