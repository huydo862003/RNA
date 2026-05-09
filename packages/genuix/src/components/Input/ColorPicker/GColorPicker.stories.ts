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
import GColorPicker from './GColorPicker.vue';

const meta = {
  title: 'Components/Input/GColorPicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Color picker with preset swatches and custom color input.',
      },
    },
  },
  component: GColorPicker,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GColorPicker,
    },
    setup () {
      const color = ref('#1c7ed6');

      return {
        color,
      };
    },
    template: `
      <div>
        <GColorPicker v-model="color" />
        <div style="margin-top: 12px; width: 48px; height: 48px; border-radius: 8px;" :style="{ backgroundColor: color }" />
      </div>
    `,
  }),
};
