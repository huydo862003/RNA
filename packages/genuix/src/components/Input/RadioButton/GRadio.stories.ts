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
import GRadio from './GRadio.vue';

const meta = {
  title: 'Components/Input/GRadio',
  tags: ['autodocs'],
  component: GRadio,
  args: {
    value: 'default',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GRadio v-model="selected" value="a" label="Option A" name="demo" />
<GRadio v-model="selected" value="b" label="Option B" name="demo" />
<GRadio v-model="selected" value="c" label="Option C" name="demo" />`,
      },
    },
  },
  render: () => ({
    components: {
      GRadio,
    },
    setup () {
      const selected = ref('a');
      return {
        selected,
      };
    },
    template: `
      <div>
        <div class="flex flex-col gap-sm">
          <GRadio v-model="selected" value="a" label="Option A" name="demo" />
          <GRadio v-model="selected" value="b" label="Option B" name="demo" />
          <GRadio v-model="selected" value="c" label="Option C" name="demo" />
        </div>
        <p class="text-xs gui-neutral-fg-muted mt-sm">Selected: {{ selected }}</p>
      </div>
    `,
  }),
};

export const DisabledStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GRadio v-model="selected" value="a" label="Enabled" name="dis" />
<GRadio v-model="selected" value="b" label="Disabled" name="dis" disabled />`,
      },
    },
  },
  render: () => ({
    components: {
      GRadio,
    },
    setup () {
      const selected = ref('a');
      return {
        selected,
      };
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GRadio v-model="selected" value="a" label="Enabled" name="dis" />
        <GRadio v-model="selected" value="b" label="Disabled" name="dis" disabled />
      </div>
    `,
  }),
};
