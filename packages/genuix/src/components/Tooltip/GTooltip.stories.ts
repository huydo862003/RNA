/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GTooltip from './GTooltip.vue';

const meta = {
  title: 'Components/GTooltip',
  tags: ['autodocs'],
  component: GTooltip,
  parameters: {
    docs: {
      description: {
        component: 'Tooltip wrapper around floating-vue. Supports `class` for styling the popper and `placement` for positioning.',
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
        story: 'Basic tooltip with default placement.',
      },
    },
  },
  args: {
    placement: 'bottom',
  },
  render: (args) => ({
    components: {
      GTooltip,
    },
    setup () {
      return {
        args,
      };
    },
    template: `
      <GTooltip v-bind="args">
        <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
          Hover me
        </button>
        <template #popper>
          Default tooltip
        </template>
      </GTooltip>
    `,
  }),
};

export const Placements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip anchored to each side. Supports all 12 Popper.js placements.',
      },
    },
  },
  render: () => ({
    components: {
      GTooltip,
    },
    template: `
      <div style="display: flex; gap: 24px; padding: 64px; flex-wrap: wrap; justify-content: center;">
        <GTooltip placement="top">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Top</button>
          <template #popper>Top tooltip</template>
        </GTooltip>
        <GTooltip placement="bottom">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Bottom</button>
          <template #popper>Bottom tooltip</template>
        </GTooltip>
        <GTooltip placement="left">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Left</button>
          <template #popper>Left tooltip</template>
        </GTooltip>
        <GTooltip placement="right">
          <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">Right</button>
          <template #popper>Right tooltip</template>
        </GTooltip>
      </div>
    `,
  }),
};

export const NoPopper: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Without `#popper` slot, children render directly with no tooltip wrapper.',
      },
    },
  },
  render: () => ({
    components: {
      GTooltip,
    },
    template: `
      <GTooltip>
        <span>No popper slot will render children directly</span>
      </GTooltip>
    `,
  }),
};
