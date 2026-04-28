/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GTooltip from './GTooltip.vue';

const meta = {
  title: 'Components/Overlay/GTooltip',
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

export const DefaultTooltipStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip with default placement.',
      },
      source: {
        code: `<GTooltip placement="bottom">
  <button>Hover me</button>
  <template #popper>
    Default tooltip
  </template>
</GTooltip>`,
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
        <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md cursor-pointer">
          Hover me
        </button>
        <template #popper>
          Default tooltip
        </template>
      </GTooltip>
    `,
  }),
};

export const PlacementsTooltipStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip anchored to each side. Supports all 12 Popper.js placements.',
      },
      source: {
        code: `<GTooltip placement="top">
  <button>Top</button>
  <template #popper>Top tooltip</template>
</GTooltip>`,
      },
    },
  },
  render: () => ({
    components: {
      GTooltip,
    },
    template: `
      <div class="flex gap-spacing-6 p-spacing-16 flex-wrap justify-center">
        <GTooltip placement="top">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Top</button>
          <template #popper>Top tooltip</template>
        </GTooltip>
        <GTooltip placement="bottom">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Bottom</button>
          <template #popper>Bottom tooltip</template>
        </GTooltip>
        <GTooltip placement="left">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Left</button>
          <template #popper>Left tooltip</template>
        </GTooltip>
        <GTooltip placement="right">
          <button class="px-spacing-4 py-spacing-2 border gui-neutral-border rounded-md">Right</button>
          <template #popper>Right tooltip</template>
        </GTooltip>
      </div>
    `,
  }),
};

export const NoPopperTooltipStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Without `#popper` slot, children render directly with no tooltip wrapper.',
      },
      source: {
        code: `<GTooltip>
  <span>No popper slot will render children directly</span>
</GTooltip>`,
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
