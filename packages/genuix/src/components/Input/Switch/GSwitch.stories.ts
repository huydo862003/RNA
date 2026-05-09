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
import GSwitch from './GSwitch.vue';
import {
  GSwitchSize,
  GSwitchSemantic,
} from './types';

const meta = {
  title: 'Components/Input/GSwitch',
  tags: ['autodocs'],
  component: GSwitch,
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Checked state (v-model)',
    },
    size: {
      control: 'select',
      options: Object.values(GSwitchSize),
      description: 'Switch size',
    },
    semantic: {
      control: 'select',
      options: Object.values(GSwitchSemantic),
      description: 'Color role when checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSwitchStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default switch with v-model',
      },
      source: {
        code: '<GSwitch v-model="checked" />',
      },
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const checked = ref(false);

      return {
        checked,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2">
        <GSwitch v-model="checked" />
        <span class="text-sm gui-neutral-fg-muted">{{ checked ? 'On' : 'Off' }}</span>
      </div>
    `,
  }),
};

export const CheckedSwitchStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Initially checked',
      },
      source: {
        code: '<GSwitch v-model="checked" />',
      },
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const checked = ref(true);

      return {
        checked,
      };
    },
    template: `
      <GSwitch v-model="checked" />
    `,
  }),
};

export const DisabledSwitchStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled state',
      },
      source: {
        code: '<GSwitch v-model="checked" disabled />',
      },
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const on = ref(false);
      const off = ref(true);

      return {
        on,
        off,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <GSwitch v-model="on" disabled />
        <GSwitch v-model="off" disabled />
      </div>
    `,
  }),
};

export const AllSizesSwitchStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All sizes side by side',
      },
      source: {
        code: '<GSwitch v-model="checked" size="md" />',
      },
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const sm = ref(true);
      const md = ref(true);
      const lg = ref(true);

      return {
        sm,
        md,
        lg,
        GSwitchSize,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <GSwitch v-model="sm" :size="GSwitchSize.Sm" />
        <GSwitch v-model="md" :size="GSwitchSize.Md" />
        <GSwitch v-model="lg" :size="GSwitchSize.Lg" />
      </div>
    `,
  }),
};

export const AllSemanticsSwitchStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All semantics when checked',
      },
      source: {
        code: '<GSwitch v-model="checked" semantic="primary" />',
      },
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const semantics = Object.values(GSwitchSemantic);
      const states = Object.fromEntries(semantics.map((semantic) => [
        semantic,
        ref(true),
      ]));

      return {
        semantics,
        states,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4 flex-wrap">
        <div v-for="semantic in semantics" :key="semantic" class="flex flex-col items-center gap-spacing-1">
          <GSwitch v-model="states[semantic].value" :semantic="semantic" />
          <span class="text-xs gui-neutral-fg-muted">{{ semantic }}</span>
        </div>
      </div>
    `,
  }),
};
