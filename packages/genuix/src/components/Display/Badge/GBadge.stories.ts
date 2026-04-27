/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GBadge from './GBadge.vue';
import {
  BadgeStyle,
} from './types';
import {
  Size,
} from '@/types';
import {
  PillColor,
} from '@/components/Display/Pill/types';

const meta = {
  title: 'Components/Display/GBadge',
  tags: ['autodocs'],
  component: GBadge,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    badgeStyle: {
      control: 'select',
      options: Object.values(BadgeStyle),
    },
    color: {
      control: 'select',
      options: Object.values(PillColor),
    },
  },
  args: {
    label: 'badge',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    template: `
      <div class="flex flex-wrap gap-sm">
        <GBadge label="license" value="MIT" color="green" />
        <GBadge label="version" value="v1.2.0" color="blue" />
        <GBadge label="build" value="passing" color="green" />
        <GBadge label="build" value="failing" color="red" />
        <GBadge label="coverage" value="94%" color="yellow" />
      </div>
    `,
  }),
};

export const LabelOnlyBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    template: `
      <div class="flex flex-wrap gap-sm">
        <GBadge label="npm" />
        <GBadge label="TypeScript" />
        <GBadge label="MIT" />
      </div>
    `,
  }),
};

export const WithLinkBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    template: `
      <div class="flex flex-wrap gap-sm">
        <GBadge label="npm" value="@hdnax/sqlingo.js" color="red" href="https://www.npmjs.com/package/@hdnax/sqlingo.js" />
        <GBadge label="github" value="sqlingo.js" color="purple" href="https://github.com/huydo862003/sqlingo.js" />
      </div>
    `,
  }),
};

export const ColorsBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    setup () {
      return {
        PillColor,
      };
    },
    template: `
      <div class="flex flex-wrap gap-sm">
        <GBadge v-for="c in Object.values(PillColor)" :key="c" label="color" :value="c" :color="c" />
      </div>
    `,
  }),
};

export const SizesBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    setup () {
      return {
        Size,
      };
    },
    template: `
      <div class="flex flex-wrap items-end gap-sm">
        <GBadge v-for="s in Object.values(Size)" :key="s" :size="s" label="size" :value="s" color="blue" />
      </div>
    `,
  }),
};

export const StylesBadgeStory: Story = {
  render: () => ({
    components: {
      GBadge,
    },
    template: `
      <div class="flex flex-col gap-sm">
        <div class="flex gap-sm">
          <GBadge label="flat" value="default" color="green" badge-style="flat" />
          <GBadge label="flat" value="MIT" color="blue" badge-style="flat" />
        </div>
        <div class="flex gap-sm">
          <GBadge label="flat-square" value="default" color="green" badge-style="flat-square" />
          <GBadge label="flat-square" value="MIT" color="blue" badge-style="flat-square" />
        </div>
      </div>
    `,
  }),
};
