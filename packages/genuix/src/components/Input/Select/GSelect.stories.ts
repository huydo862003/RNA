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
import GSelect from './GSelect.vue';
import GSelectOption from './GSelectOption.vue';
import GSelectGroup from './GSelectGroup.vue';
import {
  GSelectSize,
  GSelectState,
  GSelectVariant,
} from './types';
import {
  GPillColor,
} from '@/components/Display/Pill/types';

const meta = {
  title: 'Components/Input/GSelect',
  tags: ['autodocs'],
  component: GSelect,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(GSelectSize),
    },
    variant: {
      control: 'select',
      options: Object.values(GSelectVariant),
    },
    state: {
      control: 'select',
      options: Object.values(GSelectState),
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic select with searchable dropdown.',
      },
      source: {
        code: `<GSelect v-model="value" placeholder="Pick a fruit">
  <GSelectOption value="apple" label="Apple" />
  <GSelectOption value="banana" label="Banana" />
  <GSelectOption value="cherry" label="Cherry" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref(undefined);
      return {
        value,
        GPillColor,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ value ?? 'None' }}
        </p>
        <GSelect v-model="value" placeholder="Pick a fruit">
          <GSelectOption value="apple" label="Apple" :color="GPillColor.Red" />
          <GSelectOption value="banana" label="Banana" :color="GPillColor.Yellow" />
          <GSelectOption value="cherry" label="Cherry" :color="GPillColor.Pink" />
        </GSelect>
      </div>
    `,
  }),
};

export const SizesSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All size variants.',
      },
      source: {
        code: `<GSelect v-model="value" size="md">
  <GSelectOption value="apple" label="Apple" />
  <GSelectOption value="banana" label="Banana" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref('apple');
      return {
        value,
        GSelectSize,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-2 items-start">
        <GSelect v-model="value" :size="GSelectSize.Xs">
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
        <GSelect v-model="value" :size="GSelectSize.Sm">
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
        <GSelect v-model="value" :size="GSelectSize.Md">
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
        <GSelect v-model="value" :size="GSelectSize.Lg">
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
        <GSelect v-model="value" :size="GSelectSize.Xl">
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
      </div>
    `,
  }),
};

export const StatesSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'State variants.',
      },
      source: {
        code: `<GSelect v-model="value" state="error">
  <GSelectOption value="a" label="Option A" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref(undefined);
      return {
        value,
        GSelectState,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-3 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Default</p>
          <GSelect v-model="value" :state="GSelectState.Default">
            <GSelectOption value="a" label="Option A" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-danger-fg mb-spacing-1">Error</p>
          <GSelect v-model="value" :state="GSelectState.Error">
            <GSelectOption value="a" label="Option A" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-warning-fg mb-spacing-1">Warning</p>
          <GSelect v-model="value" :state="GSelectState.Warning">
            <GSelectOption value="a" label="Option A" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-success-fg mb-spacing-1">Success</p>
          <GSelect v-model="value" :state="GSelectState.Success">
            <GSelectOption value="a" label="Option A" />
          </GSelect>
        </div>
      </div>
    `,
  }),
};

export const DisabledSelectStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GSelect v-model="value" disabled>
  <GSelectOption value="apple" label="Apple" />
  <GSelectOption value="banana" label="Banana" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref('banana');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <GSelect v-model="value" disabled>
          <GSelectOption value="apple" label="Apple" />
          <GSelectOption value="banana" label="Banana" />
        </GSelect>
      </div>
    `,
  }),
};

export const LongOptionSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with very long option labels.',
      },
      source: {
        code: `<GSelect v-model="value" placeholder="Pick an option">
  <GSelectOption value="short" label="Short" />
  <GSelectOption value="long" label="A very long option label..." />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref(undefined);
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ value ?? 'None' }}
        </p>
        <GSelect v-model="value" placeholder="Pick an option">
          <GSelectOption value="short" label="Short" />
          <GSelectOption value="medium" label="A medium length option label" />
          <GSelectOption value="long" label="This is a very long option label that should test how the select component handles overflow and text wrapping in the dropdown menu" />
          <GSelectOption value="longer" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." />
        </GSelect>
      </div>
    `,
  }),
};

export const FixedWidthSelectStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom fixed widths to test overflow behavior. Uses unlayered utility classes to override layered component styles.',
      },
      source: {
        code: `<GSelect v-model="value" class="w-48" placeholder="Pick">
  <GSelectOption value="apple" label="Apple" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const narrow = ref('long');
      const wide = ref(undefined);
      return {
        narrow,
        wide,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Narrow (w-32 = 8rem)</p>
          <GSelect v-model="narrow" class="w-32" placeholder="Pick">
            <GSelectOption value="short" label="Short" />
            <GSelectOption value="long" label="This is a very long option that should overflow" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Wide (w-96 = 24rem)</p>
          <GSelect v-model="wide" class="w-96" placeholder="Pick a fruit">
            <GSelectOption value="apple" label="Apple" />
            <GSelectOption value="banana" label="Banana" />
            <GSelectOption value="long" label="This is a very long option that should overflow and be truncated with ellipsis" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Full width (w-full)</p>
          <GSelect v-model="wide" class="w-full" placeholder="Pick a fruit">
            <GSelectOption value="apple" label="Apple" />
            <GSelectOption value="long" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          </GSelect>
        </div>
      </div>
    `,
  }),
};

export const GroupedSelectStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GSelect v-model="value" placeholder="Status">
  <GSelectGroup label="In progress">
    <GSelectOption value="in-progress" label="In progress" />
  </GSelectGroup>
  <GSelectGroup label="Complete">
    <GSelectOption value="done" label="Done" />
  </GSelectGroup>
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
      GSelectGroup,
    },
    setup () {
      const value = ref('done');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ value ?? 'None' }}
        </p>
        <GSelect v-model="value" placeholder="Status">
          <GSelectGroup label="To-do">
            <GSelectOption value="next-week" label="Next week" />
          </GSelectGroup>
          <GSelectGroup label="In progress">
            <GSelectOption value="waiting" label="Waiting for review" />
            <GSelectOption value="in-progress" label="In progress" />
          </GSelectGroup>
          <GSelectGroup label="Complete">
            <GSelectOption value="done" label="Done" />
          </GSelectGroup>
        </GSelect>
      </div>
    `,
  }),
};

export const BoxVariantStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box variant: plain text trigger and options, no colored pills.',
      },
      source: {
        code: `<GSelect v-model="value" :variant="GSelectVariant.Box" placeholder="Pick a dialect">
  <GSelectOption value="mysql" label="MySQL" />
  <GSelectOption value="postgres" label="Postgres" />
</GSelect>`,
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const value = ref(undefined);
      return {
        value,
        GSelectVariant,
        GSelectSize,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Box (default size)</p>
          <GSelect v-model="value" :variant="GSelectVariant.Box" placeholder="Pick a dialect">
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
            <GSelectOption value="duckdb" label="DuckDB" />
            <GSelectOption value="bigquery" label="BigQuery" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Box (xs)</p>
          <GSelect v-model="value" :variant="GSelectVariant.Box" :size="GSelectSize.Xs" placeholder="Dialect">
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">
            Selected: {{ value ?? 'None' }}
          </p>
        </div>
      </div>
    `,
  }),
};

export const BoxVsPillStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pill and Box variants side by side for comparison.',
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const pill = ref('postgres');
      const box = ref('postgres');
      return {
        pill,
        box,
        GSelectVariant,
      };
    },
    template: `
      <div class="p-spacing-4 flex gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Pill (default)</p>
          <GSelect v-model="pill" :variant="GSelectVariant.Pill">
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Box</p>
          <GSelect v-model="box" :variant="GSelectVariant.Box">
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
          </GSelect>
        </div>
      </div>
    `,
  }),
};

export const AutoCloseStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Auto close on select',
      },
    },
  },
  render: () => ({
    components: {
      GSelect,
      GSelectOption,
    },
    setup () {
      const pill = ref('postgres');
      const box = ref('postgres');
      return {
        pill,
        box,
        GSelectVariant,
      };
    },
    template: `
      <div class="p-spacing-4 flex gap-spacing-4 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Not auto-close (default)</p>
          <GSelect v-model="pill">
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
          </GSelect>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Auto-close</p>
          <GSelect v-model="box" close-on-select>
            <GSelectOption value="mysql" label="MySQL" />
            <GSelectOption value="postgres" label="Postgres" />
            <GSelectOption value="sqlite" label="SQLite" />
          </GSelect>
        </div>
      </div>
    `,
  }),
};
