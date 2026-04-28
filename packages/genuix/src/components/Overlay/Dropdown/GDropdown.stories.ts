/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GDropdown from './GDropdown.vue';

const meta = {
  title: 'Components/Overlay/GDropdown',
  tags: ['autodocs'],
  component: GDropdown,
  parameters: {
    docs: {
      description: {
        component: 'Dropdown wrapper around floating-vue. Click-triggered popover with `class` for styling the popper and `placement` for positioning.',
      },
    },
  },
  argTypes: {
    width: {
      control: 'select',
      options: [
        'auto',
        'trigger',
      ],
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    class: {
      control: 'text',
      description: 'Classes applied to popper element',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdownStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown triggered by click.',
      },
    },
  },
  args: {
    placement: 'bottom',
  },
  render: (args) => ({
    components: {
      GDropdown,
    },
    setup () {
      return {
        args,
      };
    },
    template: `
      <GDropdown v-bind="args">
        <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md cursor-pointer">
          Click me
        </button>
        <template #popper>
          <div class="px-spacing-3 py-spacing-2">Dropdown content</div>
        </template>
      </GDropdown>
    `,
  }),
};

export const PlacementsDropdownStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown anchored to each side.',
      },
    },
  },
  render: () => ({
    components: {
      GDropdown,
    },
    template: `
      <div class="flex gap-spacing-6 p-spacing-16 flex-wrap justify-center">
        <GDropdown placement="top">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Top</button>
          <template #popper><div class="px-spacing-3 py-spacing-2">Top dropdown</div></template>
        </GDropdown>
        <GDropdown placement="bottom">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Bottom</button>
          <template #popper><div class="px-spacing-3 py-spacing-2">Bottom dropdown</div></template>
        </GDropdown>
        <GDropdown placement="left">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Left</button>
          <template #popper><div class="px-spacing-3 py-spacing-2">Left dropdown</div></template>
        </GDropdown>
        <GDropdown placement="right">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Right</button>
          <template #popper><div class="px-spacing-3 py-spacing-2">Right dropdown</div></template>
        </GDropdown>
      </div>
    `,
  }),
};

export const WithMenuDropdownStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with menu-style content.',
      },
    },
  },
  render: () => ({
    components: {
      GDropdown,
    },
    template: `
      <GDropdown placement="bottom-start">
        <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md cursor-pointer">
          Menu
        </button>
        <template #popper>
          <div class="flex flex-col min-w-[120px]">
            <button class="px-spacing-3 py-spacing-2 text-left border-none bg-transparent cursor-pointer">Item 1</button>
            <button class="px-spacing-3 py-spacing-2 text-left border-none bg-transparent cursor-pointer">Item 2</button>
            <button class="px-spacing-3 py-spacing-2 text-left border-none bg-transparent cursor-pointer">Item 3</button>
          </div>
        </template>
      </GDropdown>
    `,
  }),
};

export const WidthDropdownStory: Story = {
  parameters: {
    docs: {
      description: {
        story: '`width="auto"` (default) sizes to content. `width="trigger"` matches the trigger element width.',
      },
    },
  },
  render: () => ({
    components: {
      GDropdown,
    },
    template: `
      <div class="flex gap-lg items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm">width="auto"</p>
          <GDropdown placement="bottom-start" width="auto">
            <button class="px-xl py-sm border gui-neutral-border rounded-md cursor-pointer" style="width: 200px">Wide trigger</button>
            <template #popper>
              <div class="px-md py-sm text-sm">Short</div>
            </template>
          </GDropdown>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm">width="trigger"</p>
          <GDropdown placement="bottom-start" width="trigger">
            <button class="px-xl py-sm border gui-neutral-border rounded-md cursor-pointer" style="width: 200px">Wide trigger</button>
            <template #popper>
              <div class="px-md py-sm text-sm">Matches trigger width</div>
            </template>
          </GDropdown>
        </div>
      </div>
    `,
  }),
};
