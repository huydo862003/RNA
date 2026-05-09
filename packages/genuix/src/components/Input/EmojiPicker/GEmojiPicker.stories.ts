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
import GEmojiPicker from './GEmojiPicker.vue';

const meta = {
  title: 'Components/Input/GEmojiPicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Emoji picker with categories, search, and system emoji font (Apple Color Emoji / Noto Color Emoji).',
      },
    },
  },
  component: GEmojiPicker,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GEmojiPicker,
    },
    setup () {
      const selected = ref('');

      return {
        selected,
      };
    },
    template: `
      <div>
        <GEmojiPicker @select="selected = $event" />
        <p v-if="selected" style="margin-top: 12px; font-size: 32px;">{{ selected }}</p>
      </div>
    `,
  }),
};
