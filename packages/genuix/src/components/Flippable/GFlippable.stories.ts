/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  ref,
} from 'vue';
import GFlippable from './GFlippable.vue';
import {
  FlipDirection,
  FlipTrigger,
} from './types';

const meta = {
  title: 'Components/GFlippable',
  tags: ['autodocs'],
  args: {},
  argTypes: {
    flipped: {
      control: 'boolean',
      description: 'Whether the back face is shown',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable flipping',
    },
    direction: {
      control: 'select',
      options: Object.values(FlipDirection),
      description: 'Flip axis',
    },
    trigger: {
      control: 'select',
      options: Object.values(FlipTrigger),
      description: 'What triggers flip. Click (default), hover, or manual',
    },
  },
  component: GFlippable,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: {
    GFlippable,
  },
  setup () {
    return {
      args,
    };
  },
  template: `
    <GFlippable v-bind="args" ref="flippable" class="w-[200px] h-[120px]">
      <template #front>
        <div class="flex items-center justify-center rounded-lg font-bold gui-info-bg-hover gui-info-fg h-full">
          Front
        </div>
      </template>
      <template #back>
        <div class="flex items-center justify-center rounded-lg font-bold gui-success-bg-hover gui-success-fg h-full">
          Back
        </div>
      </template>
    </GFlippable>
  `,
});

export const DefaultFlipStory: Story = {
  args: {
    flipped: false,
    direction: FlipDirection.Horizontal,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal flip',
      },
    },
  },
  render,
};

export const FlippedFlipStory: Story = {
  args: {
    flipped: true,
    direction: FlipDirection.Horizontal,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initially showing back face',
      },
    },
  },
  render,
};

export const VerticalFlipStory: Story = {
  args: {
    flipped: false,
    direction: FlipDirection.Vertical,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical flip axis',
      },
    },
  },
  render,
};

export const HoverFlipStory: Story = {
  args: {
    flipped: false,
    trigger: FlipTrigger.Hover,
  },
  parameters: {
    docs: {
      description: {
        story: 'Flip on hover, revert on leave',
      },
    },
  },
  render,
};

export const DisabledFlipStory: Story = {
  args: {
    flipped: false,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Flipping disabled',
      },
    },
  },
  render,
};

export const ProgrammaticFlipStory: Story = {
  args: {
    flipped: false,
    trigger: FlipTrigger.Manual,
  },
  parameters: {
    docs: {
      description: {
        story: 'Manual trigger, flip via exposed method',
      },
    },
  },
  render: (args) => ({
    components: {
      GFlippable,
    },
    setup () {
      const flippable = ref(null);
      return {
        args,
        flippable,
      };
    },
    template: `
      <div>
        <button @click="flippable?.flip()" class="mb-spacing-2 gui-neutral-border border py-xs px-lg gui-neutral-bg-active rounded-md cursor-pointer mb-2">Flip</button>
        <GFlippable v-bind="args" ref="flippable">
          <template #front>
            <div class="flex items-center justify-center w-[200px] h-[120px] rounded-lg font-bold gui-info-bg-hover gui-info-fg">
              Front
            </div>
          </template>
          <template #back>
            <div class="flex items-center justify-center w-[200px] h-[120px] rounded-lg font-bold gui-success-bg-hover gui-success-fg">
              Back
            </div>
          </template>
        </GFlippable>
      </div>
    `,
  }),
};
