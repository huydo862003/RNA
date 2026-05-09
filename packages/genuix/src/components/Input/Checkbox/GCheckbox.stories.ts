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
import GCheckbox from './GCheckbox.vue';
import {
  GSemantic,
} from '@/types';

const meta = {
  title: 'Components/Input/GCheckbox',
  tags: ['autodocs'],
  component: GCheckbox,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GCheckbox v-model="checked" label="Accept terms" />',
      },
    },
  },
  render: () => ({
    components: {
      GCheckbox,
    },
    setup () {
      const checked = ref(false);

      return {
        checked,
      };
    },
    template: `
      <div>
        <GCheckbox v-model="checked" label="Accept terms" />
        <p class="text-xs gui-neutral-fg-muted mt-sm">Checked: {{ checked }}</p>
      </div>
    `,
  }),
};

export const GroupStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GCheckbox v-model="a" label="Option A" />
<GCheckbox v-model="b" label="Option B" />
<GCheckbox v-model="c" label="Option C" />`,
      },
    },
  },
  render: () => ({
    components: {
      GCheckbox,
    },
    setup () {
      const optionA = ref(true);
      const optionB = ref(false);
      const optionC = ref(false);

      return {
        optionA,
        optionB,
        optionC,
      };
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GCheckbox v-model="optionA" label="Option A" />
        <GCheckbox v-model="optionB" label="Option B" />
        <GCheckbox v-model="optionC" label="Option C" />
      </div>
    `,
  }),
};

export const DisabledStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GCheckbox :model-value="true" label="Checked & disabled" disabled />',
      },
    },
  },
  render: () => ({
    components: {
      GCheckbox,
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GCheckbox :model-value="true" label="Checked & disabled" disabled />
        <GCheckbox :model-value="false" label="Unchecked & disabled" disabled />
      </div>
    `,
  }),
};

export const SemanticsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GCheckbox v-model="checked" semantic="success" label="Approved" />',
      },
    },
  },
  render: () => ({
    components: {
      GCheckbox,
    },
    setup () {
      return {
        GSemantic,
      };
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GCheckbox :model-value="true" v-for="s in Object.values(GSemantic)" :key="s" :semantic="s" :label="s" />
      </div>
    `,
  }),
};
