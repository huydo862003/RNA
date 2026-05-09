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
import GMultiSelect from './GMultiSelect.vue';
import GMultiSelectOption from './GMultiSelectOption.vue';
import {
  GMultiSelectSize,
  GMultiSelectState,
  GMultiSelectVariant,
} from './types';
import {
  GPillColor,
} from '@/components/Display/Pill/types';

const meta = {
  title: 'Components/Input/GMultiSelect',
  tags: ['autodocs'],
  component: GMultiSelect,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(GMultiSelectSize),
    },
    state: {
      control: 'select',
      options: Object.values(GMultiSelectState),
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMultiSelectStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GMultiSelect v-model="selected" placeholder="Pick fruits">
  <GMultiSelectOption value="apple" label="Apple" />
  <GMultiSelectOption value="banana" label="Banana" />
  <GMultiSelectOption value="cherry" label="Cherry" />
</GMultiSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GMultiSelect,
      GMultiSelectOption,
    },
    setup () {
      const selected = ref(['apple']);

      return {
        selected,
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ selected }}
        </p>
        <GMultiSelect v-model="selected" placeholder="Pick fruits">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
      </div>
    `,
  }),
};

export const SizesMultiSelectStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GMultiSelect v-model="selected" size="md">
  <GMultiSelectOption value="apple" label="Apple" />
  <GMultiSelectOption value="banana" label="Banana" />
</GMultiSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GMultiSelect,
      GMultiSelectOption,
    },
    setup () {
      const selected = ref([
        'apple',
        'cherry',
      ]);

      return {
        selected,
        GMultiSelectSize,
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-2 items-start">
        <GMultiSelect v-model="selected" :size="GMultiSelectSize.Xs">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="GMultiSelectSize.Sm">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="GMultiSelectSize.Md">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="GMultiSelectSize.Lg">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="GMultiSelectSize.Xl">
          <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GMultiSelect>
      </div>
    `,
  }),
};

export const FixedWidthMultiSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom fixed widths to test overflow behavior. Unlayered utility classes override layered component styles without !important.',
      },
      source: {
        code: `<GMultiSelect v-model="selected" class="w-48">
  <GMultiSelectOption value="apple" label="Apple" />
  <GMultiSelectOption value="banana" label="Banana" />
</GMultiSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GMultiSelect,
      GMultiSelectOption,
    },
    setup () {
      const narrow = ref([
        'apple',
        'banana',
        'cherry',
      ]);
      const wide = ref(['apple']);

      return {
        narrow,
        wide,
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Narrow (w-48 = 12rem)</p>
          <GMultiSelect v-model="narrow" class="w-48">
            <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
          </GMultiSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Wide (w-96 = 24rem)</p>
          <GMultiSelect v-model="wide" class="w-96">
            <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana with a very long label that overflows" :color="GPillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
          </GMultiSelect>
        </div>
        <div class="w-full">
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Full width (w-full)</p>
          <GMultiSelect v-model="narrow" class="w-full">
            <GMultiSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
          </GMultiSelect>
        </div>
      </div>
    `,
  }),
};

export const BoxMultiSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-select box variant (pill by default)',
      },
      source: {
        code: `<GMultiSelect v-model="selected" :variant="GMultiSelectVariant.Box" class="w-48">
  <GMultiSelectOption value="apple" label="Apple" />
  <GMultiSelectOption value="banana" label="Banana" />
</GMultiSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GMultiSelect,
      GMultiSelectOption,
    },
    setup () {
      const selected = ref<string[]>([]);

      return {
        selected,
        GMultiSelectVariant,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-4 items-start">
        <GMultiSelect v-model="selected" :variant="GMultiSelectVariant.Box" class="w-48">
          <GMultiSelectOption value="apple" label="Apple" />
          <GMultiSelectOption value="banana" label="Banana" />
          <GMultiSelectOption value="orange" label="Orange" />
        </GMultiSelect>
      </div>
    `,
  }),
};
