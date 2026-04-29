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
import GNumberInput from './GNumberInput.vue';
import {
  NumberInputState,
} from './types';
import {
  Size,
} from '@/types';

const meta = {
  title: 'Components/Input/GNumberInput',
  tags: ['autodocs'],
  component: GNumberInput,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GNumberInput v-model="val" />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(5);
      return {
        val,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Value: {{ val }}</p>
        <GNumberInput v-model="val" />
      </div>
    `,
  }),
};

export const MinMaxStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Out-of-bounds values automatically show error state. Try typing a value outside 0-10.',
      },
      source: {
        code: '<GNumberInput v-model="val" :min="0" :max="10" :step="2" />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(0);
      return {
        val,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Value: {{ val }} (min: 0, max: 10, step: 2)</p>
        <GNumberInput v-model="val" :min="0" :max="10" :step="2" />
      </div>
    `,
  }),
};

export const SizesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GNumberInput v-model="val" size="md" />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(42);
      return {
        val,
        Size,
      };
    },
    template: `
      <div class="flex flex-col gap-sm items-start">
        <div v-for="s in Object.values(Size)" :key="s" class="flex items-center gap-sm">
          <span class="text-xs gui-neutral-fg-muted w-8">{{ s }}</span>
          <GNumberInput v-model="val" :size="s" />
        </div>
      </div>
    `,
  }),
};

export const StatesStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Manual state variants. Error state also triggers automatically on out-of-bounds values.',
      },
      source: {
        code: '<GNumberInput v-model="val" state="error" />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(5);
      return {
        val,
        NumberInputState,
      };
    },
    template: `
      <div class="flex flex-col gap-sm items-start">
        <div v-for="s in Object.values(NumberInputState)" :key="s" class="flex items-center gap-sm">
          <span class="text-xs gui-neutral-fg-muted w-16">{{ s }}</span>
          <GNumberInput v-model="val" :state="s" />
        </div>
      </div>
    `,
  }),
};

export const DisabledStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GNumberInput v-model="val" disabled />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(42);
      return {
        val,
      };
    },
    template: '<GNumberInput v-model="val" disabled />',
  }),
};

export const IntegerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Integer-only input. Decimal point is rejected with error flash.',
      },
      source: {
        code: '<GNumberInput v-model="val" integer />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(0);
      return {
        val,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Value: {{ val }} (integer only)</p>
        <GNumberInput v-model="val" integer />
      </div>
    `,
  }),
};

export const NoStepperStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Without stepper buttons. Manual entry only.',
      },
      source: {
        code: '<GNumberInput v-model="val" no-stepper />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(42);
      return {
        val,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Value: {{ val }}</p>
        <GNumberInput v-model="val" no-stepper />
      </div>
    `,
  }),
};

export const NegativeValuesStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Negative min allows minus sign. Out-of-bounds shows error.',
      },
      source: {
        code: '<GNumberInput v-model="val" :min="-100" :max="100" />',
      },
    },
  },
  render: () => ({
    components: {
      GNumberInput,
    },
    setup () {
      const val = ref(0);
      return {
        val,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Value: {{ val }} (min: -100, max: 100)</p>
        <GNumberInput v-model="val" :min="-100" :max="100" />
      </div>
    `,
  }),
};
