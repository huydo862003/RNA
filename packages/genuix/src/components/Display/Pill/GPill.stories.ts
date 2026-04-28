/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GPill from './GPill.vue';
import {
  PillSize,
  PillColor,
} from './types';
import {
  Prominence,
} from '@/types';

const meta = {
  title: 'Components/Display/GPill',
  tags: ['autodocs'],
  component: GPill,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(PillSize),
    },
    color: {
      control: 'select',
      options: Object.values(PillColor),
    },
    prominence: {
      control: 'select',
      options: Object.values(Prominence),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPillStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GPill>Default</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    template: `
      <div class="p-spacing-4 flex gap-spacing-2">
        <GPill>Default</GPill>
      </div>
    `,
  }),
};

export const ColorsPillStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GPill :color="PillColor.Blue">Blue</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="PillColor.Gray">Gray</GPill>
        <GPill :color="PillColor.Red">Red</GPill>
        <GPill :color="PillColor.Pink">Pink</GPill>
        <GPill :color="PillColor.Purple">Purple</GPill>
        <GPill :color="PillColor.Blue">Blue</GPill>
        <GPill :color="PillColor.Teal">Teal</GPill>
        <GPill :color="PillColor.Green">Green</GPill>
        <GPill :color="PillColor.Yellow">Yellow</GPill>
        <GPill :color="PillColor.Orange">Orange</GPill>
        <GPill :color="PillColor.Brown">Brown</GPill>
      </div>
    `,
  }),
};

export const ProminencesPillStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All prominence levels for a single color.',
      },
      source: {
        code: '<GPill :color="PillColor.Blue" :prominence="Prominence.Primary">Primary</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        PillColor,
        Prominence,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="PillColor.Blue" :prominence="Prominence.Primary">Primary</GPill>
        <GPill :color="PillColor.Blue" :prominence="Prominence.Secondary">Secondary</GPill>
        <GPill :color="PillColor.Blue" :prominence="Prominence.Tertiary">Tertiary</GPill>
        <GPill :color="PillColor.Blue" :prominence="Prominence.Ghost">Ghost</GPill>
      </div>
    `,
  }),
};

export const SizesPillStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GPill :size="PillSize.Md" :color="PillColor.Blue">Md</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        PillSize,
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap items-center gap-spacing-2">
        <GPill :size="PillSize.Xs" :color="PillColor.Blue">Xs</GPill>
        <GPill :size="PillSize.Sm" :color="PillColor.Blue">Sm</GPill>
        <GPill :size="PillSize.Md" :color="PillColor.Blue">Md</GPill>
        <GPill :size="PillSize.Lg" :color="PillColor.Blue">Lg</GPill>
        <GPill :size="PillSize.Xl" :color="PillColor.Blue">Xl</GPill>
      </div>
    `,
  }),
};

export const WithSlotsPillStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Left/right slots for attachable behavior.',
      },
      source: {
        code: `<GPill :color="PillColor.Blue">
  <template #left>
    <span style="width:8px;height:8px;border-radius:50%;background:var(--gui-info-solid);display:inline-block" />
  </template>
  With dot
</GPill>`,
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="PillColor.Blue">
          <template #left>
            <span style="width:8px;height:8px;border-radius:50%;background:var(--gui-info-solid);display:inline-block" />
          </template>
          With dot
        </GPill>
        <GPill :color="PillColor.Red">
          Red tag
          <template #right>
            <button style="opacity:0.6;cursor:pointer;border:none;background:none;color:inherit;padding:0;display:inline-flex" aria-label="Remove">×</button>
          </template>
        </GPill>
      </div>
    `,
  }),
};
