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
import {
  DateTime,
} from 'luxon';
import GDatePicker from './GDatePicker.vue';
import {
  DatePickerSize,
} from './types';

const meta = {
  title: 'Components/Input/GDatePicker',
  tags: ['autodocs'],
  component: GDatePicker,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DatePickerSize),
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

export const BasicDatePickerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click trigger to open calendar dropdown. Select a day to update the date.',
      },
    },
  },
  render: () => ({
    components: {
      GDatePicker,
    },
    setup () {
      const date = ref(DateTime.now());
      return {
        date,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ date ? date.toFormat('MMMM d, y') : 'None' }}
        </p>
        <GDatePicker v-model="date" />
      </div>
    `,
  }),
};

export const EmptyDatePickerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No initial date. Trigger shows placeholder text.',
      },
    },
  },
  render: () => ({
    components: {
      GDatePicker,
    },
    setup () {
      const date = ref(undefined);
      return {
        date,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ date ? date.toFormat('MMMM d, y') : 'None' }}
        </p>
        <GDatePicker v-model="date" placeholder="Pick a date" />
      </div>
    `,
  }),
};

export const SizesDatePickerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All trigger size variants from xs to xl.',
      },
    },
  },
  render: () => ({
    components: {
      GDatePicker,
    },
    setup () {
      const date = ref(DateTime.now());
      return {
        date,
        DatePickerSize,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-2 items-start">
        <GDatePicker v-model="date" :size="DatePickerSize.Xs" />
        <GDatePicker v-model="date" :size="DatePickerSize.Sm" />
        <GDatePicker v-model="date" :size="DatePickerSize.Md" />
        <GDatePicker v-model="date" :size="DatePickerSize.Lg" />
        <GDatePicker v-model="date" :size="DatePickerSize.Xl" />
      </div>
    `,
  }),
};

export const CustomPanelDatePickerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panel slot lets consumers add controls below the calendar grid.',
      },
    },
  },
  render: () => ({
    components: {
      GDatePicker,
    },
    setup () {
      const date = ref(DateTime.now());
      const includeTime = ref(false);
      return {
        date,
        includeTime,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Selected: {{ date ? date.toFormat('MMMM d, y') : 'None' }}
          {{ includeTime ? '(with time)' : '' }}
        </p>
        <GDatePicker v-model="date">
          <template #panel="{ clear }">
            <div class="flex flex-col">
              <div class="flex items-center justify-between py-xs px-xs">
                <span class="text-sm gui-neutral-fg">Include time</span>
                <input type="checkbox" v-model="includeTime" />
              </div>
              <button
                class="text-sm gui-neutral-fg-muted text-left py-xs px-xs hover:gui-neutral-bg-hover rounded-sm"
                @click="clear"
              >Clear</button>
            </div>
          </template>
        </GDatePicker>
      </div>
    `,
  }),
};

export const DisabledDatePickerStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled trigger cannot be clicked.',
      },
    },
  },
  render: () => ({
    components: {
      GDatePicker,
    },
    setup () {
      const date = ref(DateTime.now());
      return {
        date,
      };
    },
    template: `
      <div class="p-spacing-4">
        <GDatePicker v-model="date" disabled />
      </div>
    `,
  }),
};
