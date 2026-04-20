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
  SwitchSize,
  SwitchSemantic,
} from './types';

const meta = {
  title: 'Components/GSwitch',
  tags: ['autodocs'],
  component: GSwitch,
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Checked state (v-model)',
    },
    size: {
      control: 'select',
      options: Object.values(SwitchSize),
      description: 'Switch size',
    },
    semantic: {
      control: 'select',
      options: Object.values(SwitchSemantic),
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
        SwitchSize,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4">
        <GSwitch v-model="sm" :size="SwitchSize.Sm" />
        <GSwitch v-model="md" :size="SwitchSize.Md" />
        <GSwitch v-model="lg" :size="SwitchSize.Lg" />
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
    },
  },
  render: () => ({
    components: {
      GSwitch,
    },
    setup () {
      const semantics = Object.values(SwitchSemantic);
      const states = Object.fromEntries(semantics.map((s) => [
        s,
        ref(true),
      ]));
      return {
        semantics,
        states,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-4 flex-wrap">
        <div v-for="s in semantics" :key="s" class="flex flex-col items-center gap-spacing-1">
          <GSwitch v-model="states[s].value" :semantic="s" />
          <span class="text-xs gui-neutral-fg-muted">{{ s }}</span>
        </div>
      </div>
    `,
  }),
};
