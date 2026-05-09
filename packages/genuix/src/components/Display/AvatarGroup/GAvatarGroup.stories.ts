/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GAvatarGroup from './GAvatarGroup.vue';
import GAvatar from '@/components/Display/Avatar/GAvatar.vue';

const meta = {
  title: 'Components/Display/GAvatarGroup',
  tags: ['autodocs'],
  component: GAvatarGroup,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GAvatarGroup>
  <GAvatar label="Alice">AJ</GAvatar>
  <GAvatar label="Bob">BS</GAvatar>
</GAvatarGroup>`,
      },
    },
  },
  render: () => ({
    components: {
      GAvatarGroup,
      GAvatar,
    },
    template: `
      <GAvatarGroup>
        <GAvatar label="Alice Johnson" class="gui-info-bg-hover gui-info-fg">AJ</GAvatar>
        <GAvatar label="Bob Smith" class="gui-success-bg-hover gui-success-fg">BS</GAvatar>
        <GAvatar label="Carol" class="gui-warning-bg-hover gui-warning-fg">C</GAvatar>
      </GAvatarGroup>
    `,
  }),
};

export const WithOverflowStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GAvatarGroup :limit="3">
  <GAvatar label="Alice">AJ</GAvatar>
  <GAvatar label="Bob">BS</GAvatar>
</GAvatarGroup>`,
      },
    },
  },
  render: () => ({
    components: {
      GAvatarGroup,
      GAvatar,
    },
    template: `
      <GAvatarGroup :limit="3">
        <GAvatar label="Alice Johnson" class="gui-info-bg-hover gui-info-fg">AJ</GAvatar>
        <GAvatar label="Bob Smith" class="gui-success-bg-hover gui-success-fg">BS</GAvatar>
        <GAvatar label="Carol" class="gui-warning-bg-hover gui-warning-fg">C</GAvatar>
        <GAvatar label="Daniel" class="gui-warning-bg-hover gui-warning-fg">D</GAvatar>
        <GAvatar label="Carol" class="gui-warning-bg-hover gui-warning-fg">E</GAvatar>
        <GAvatar label="Carol" class="gui-warning-bg-hover gui-warning-fg">F</GAvatar>
      </GAvatarGroup>
    `,
  }),
};

export const WithImagesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GAvatarGroup :limit="3">
  <GAvatar label="Alice"><img src="..." class="w-full h-full object-cover" /></GAvatar>
</GAvatarGroup>`,
      },
    },
  },
  render: () => ({
    components: {
      GAvatarGroup,
      GAvatar,
    },
    template: `
      <GAvatarGroup :limit="3">
        <GAvatar label="Alice"><img src="https://i.pravatar.cc/150?u=alice" alt="Alice" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="Bob"><img src="https://i.pravatar.cc/150?u=bob" alt="Bob" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="Carol"><img src="https://i.pravatar.cc/150?u=carol" alt="Carol" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="David"><img src="https://i.pravatar.cc/150?u=david" alt="David" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="Edward"><img src="https://i.pravatar.cc/150?u=edward" alt="Edward" class="w-full h-full object-cover" /></GAvatar>
        <GAvatar label="George"><img src="https://i.pravatar.cc/150?u=george" alt="George" class="w-full h-full object-cover" /></GAvatar>
      </GAvatarGroup>
    `,
  }),
};
