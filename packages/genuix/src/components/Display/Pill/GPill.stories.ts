/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GPill from './GPill.vue';
import {
  GPillSize,
  GPillColor,
} from './types';
import {
  GProminence,
} from '@/types';

const meta = {
  title: 'Components/Display/GPill',
  tags: ['autodocs'],
  component: GPill,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(GPillSize),
    },
    color: {
      control: 'select',
      options: Object.values(GPillColor),
    },
    prominence: {
      control: 'select',
      options: Object.values(GProminence),
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
        code: '<GPill :color="GPillColor.Blue">Blue</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="GPillColor.Gray">Gray</GPill>
        <GPill :color="GPillColor.Red">Red</GPill>
        <GPill :color="GPillColor.Pink">Pink</GPill>
        <GPill :color="GPillColor.Purple">Purple</GPill>
        <GPill :color="GPillColor.Blue">Blue</GPill>
        <GPill :color="GPillColor.Teal">Teal</GPill>
        <GPill :color="GPillColor.Green">Green</GPill>
        <GPill :color="GPillColor.Yellow">Yellow</GPill>
        <GPill :color="GPillColor.Orange">Orange</GPill>
        <GPill :color="GPillColor.Brown">Brown</GPill>
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
        code: '<GPill :color="GPillColor.Blue" :prominence="GProminence.Primary">Primary</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        GPillColor,
        GProminence,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="GPillColor.Blue" :prominence="GProminence.Primary">Primary</GPill>
        <GPill :color="GPillColor.Blue" :prominence="GProminence.Secondary">Secondary</GPill>
        <GPill :color="GPillColor.Blue" :prominence="GProminence.Tertiary">Tertiary</GPill>
        <GPill :color="GPillColor.Blue" :prominence="GProminence.Ghost">Ghost</GPill>
      </div>
    `,
  }),
};

export const SizesPillStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GPill :size="GPillSize.Md" :color="GPillColor.Blue">Md</GPill>',
      },
    },
  },
  render: () => ({
    components: {
      GPill,
    },
    setup () {
      return {
        GPillSize,
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap items-center gap-spacing-2">
        <GPill :size="GPillSize.Xs" :color="GPillColor.Blue">Xs</GPill>
        <GPill :size="GPillSize.Sm" :color="GPillColor.Blue">Sm</GPill>
        <GPill :size="GPillSize.Md" :color="GPillColor.Blue">Md</GPill>
        <GPill :size="GPillSize.Lg" :color="GPillColor.Blue">Lg</GPill>
        <GPill :size="GPillSize.Xl" :color="GPillColor.Blue">Xl</GPill>
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
        code: `<GPill :color="GPillColor.Blue">
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
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-wrap gap-spacing-2">
        <GPill :color="GPillColor.Blue">
          <template #left>
            <span style="width:8px;height:8px;border-radius:50%;background:var(--gui-info-solid);display:inline-block" />
          </template>
          With dot
        </GPill>
        <GPill :color="GPillColor.Red">
          Red tag
          <template #right>
            <button style="opacity:0.6;cursor:pointer;border:none;background:none;color:inherit;padding:0;display:inline-flex" aria-label="Remove">×</button>
          </template>
        </GPill>
      </div>
    `,
  }),
};
