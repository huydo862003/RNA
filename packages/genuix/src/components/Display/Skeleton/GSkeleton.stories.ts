/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GSkeleton from './GSkeleton.vue';

const meta = {
  title: 'Components/Display/GSkeleton',
  tags: ['autodocs'],
  component: GSkeleton,
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GSkeleton />',
      },
    },
  },
  render: () => ({
    components: {
      GSkeleton,
    },
    template: `
      <div class="flex flex-col gap-xs w-80">
        <GSkeleton />
        <GSkeleton width="75%" />
        <GSkeleton width="50%" />
      </div>
    `,
  }),
};

export const CircleStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GSkeleton />',
      },
    },
  },
  render: () => ({
    components: {
      GSkeleton,
    },
    setup () {
      return {};
    },
    template: `
      <div class="flex items-center gap-sm">
        <GSkeleton class="size-10 rounded-full" />
        <div class="flex flex-col gap-xs flex-1">
          <GSkeleton width="60%" />
          <GSkeleton width="40%" />
        </div>
      </div>
    `,
  }),
};

export const RectStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div class="flex flex-col gap-sm w-80">
  <GSkeleton height="120px" />
  <GSkeleton />
  <GSkeleton width="75%" />
</div>
`,
      },
    },
  },
  render: () => ({
    components: {
      GSkeleton,
    },
    setup () {
      return {};
    },
    template: `
      <div class="flex flex-col gap-sm w-80">
        <GSkeleton height="120px" />
        <GSkeleton />
        <GSkeleton width="75%" />
      </div>
    `,
  }),
};

export const CardSkeletonStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<!-- Card loading skeleton -->
<div class="flex flex-col gap-sm w-72 p-md border gui-neutral-border rounded-md">
  <GSkeleton height="160px" />
  <GSkeleton width="70%" />
  <GSkeleton />
  <GSkeleton width="50%" />
</div>`,
      },
    },
  },
  render: () => ({
    components: {
      GSkeleton,
    },
    setup () {
      return {};
    },
    template: `
      <div class="flex flex-col gap-sm w-72 p-md border gui-neutral-border rounded-md">
        <GSkeleton height="160px" />
        <GSkeleton width="70%" />
        <GSkeleton />
        <GSkeleton width="50%" />
      </div>
    `,
  }),
};
