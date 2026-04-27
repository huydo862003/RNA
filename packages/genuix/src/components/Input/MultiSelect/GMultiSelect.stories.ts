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
  MultiSelectSize,
  MultiSelectState,
} from './types';
import {
  PillColor,
} from '@/components/Display/Pill/types';

const meta = {
  title: 'Components/Input/GMultiSelect',
  tags: ['autodocs'],
  component: GMultiSelect,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(MultiSelectSize),
    },
    state: {
      control: 'select',
      options: Object.values(MultiSelectState),
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMultiSelectStory: Story = {
  render: () => ({
    components: {
      GMultiSelect,
      GMultiSelectOption,
    },
    setup () {
      const selected = ref(['apple']);
      return {
        selected,
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ selected }}
        </p>
        <GMultiSelect v-model="selected" placeholder="Pick fruits">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
        </GMultiSelect>
      </div>
    `,
  }),
};

export const SizesMultiSelectStory: Story = {
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
        MultiSelectSize,
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-2 items-start">
        <GMultiSelect v-model="selected" :size="MultiSelectSize.Xs">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="MultiSelectSize.Sm">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="MultiSelectSize.Md">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="MultiSelectSize.Lg">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
        </GMultiSelect>
        <GMultiSelect v-model="selected" :size="MultiSelectSize.Xl">
          <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
          <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
          <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
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
        PillColor,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Narrow (w-48 = 12rem)</p>
          <GMultiSelect v-model="narrow" class="w-48">
            <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
          </GMultiSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Wide (w-96 = 24rem)</p>
          <GMultiSelect v-model="wide" class="w-96">
            <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana with a very long label that overflows" :color="PillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
          </GMultiSelect>
        </div>
        <div class="w-full">
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Full width (w-full)</p>
          <GMultiSelect v-model="narrow" class="w-full">
            <GMultiSelectOption value="apple" label="Apple" :color="PillColor.Red" />
            <GMultiSelectOption value="banana" label="Banana" :color="PillColor.Yellow" />
            <GMultiSelectOption value="cherry" label="Cherry" :color="PillColor.Pink" />
          </GMultiSelect>
        </div>
      </div>
    `,
  }),
};
