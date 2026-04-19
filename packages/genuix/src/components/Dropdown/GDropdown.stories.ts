/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GDropdown from './GDropdown.vue';

const meta = {
  title: 'Components/GDropdown',
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

export const Default: Story = {
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
        <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
          Click me
        </button>
        <template #popper>
          <div style="padding: 8px 12px;">Dropdown content</div>
        </template>
      </GDropdown>
    `,
  }),
};

export const Placements: Story = {
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
      <div style="display: flex; gap: 24px; padding: 64px; flex-wrap: wrap; justify-content: center;">
        <GDropdown placement="top">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Top</button>
          <template #popper><div style="padding: 8px 12px;">Top dropdown</div></template>
        </GDropdown>
        <GDropdown placement="bottom">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Bottom</button>
          <template #popper><div style="padding: 8px 12px;">Bottom dropdown</div></template>
        </GDropdown>
        <GDropdown placement="left">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Left</button>
          <template #popper><div style="padding: 8px 12px;">Left dropdown</div></template>
        </GDropdown>
        <GDropdown placement="right">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Right</button>
          <template #popper><div style="padding: 8px 12px;">Right dropdown</div></template>
        </GDropdown>
      </div>
    `,
  }),
};

export const WithMenu: Story = {
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
        <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
          Menu
        </button>
        <template #popper>
          <div style="display: flex; flex-direction: column; min-width: 120px;">
            <button style="padding: 8px 12px; text-align: left; border: none; background: none; cursor: pointer;">Item 1</button>
            <button style="padding: 8px 12px; text-align: left; border: none; background: none; cursor: pointer;">Item 2</button>
            <button style="padding: 8px 12px; text-align: left; border: none; background: none; cursor: pointer;">Item 3</button>
          </div>
        </template>
      </GDropdown>
    `,
  }),
};
