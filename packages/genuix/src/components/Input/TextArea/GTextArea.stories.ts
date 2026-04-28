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
import GTextArea from './GTextArea.vue';
import {
  TextAreaState,
} from './types';

const meta = {
  title: 'Components/Input/GTextArea',
  tags: ['autodocs'],
  component: GTextArea,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GTextArea v-model="text" placeholder="Type something..." />',
      },
    },
  },
  render: () => ({
    components: {
      GTextArea,
    },
    setup () {
      const text = ref('');
      return {
        text,
      };
    },
    template: '<GTextArea v-model="text" placeholder="Type something..." />',
  }),
};

export const StatesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GTextArea v-model="text" state="error" placeholder="Error" />',
      },
    },
  },
  render: () => ({
    components: {
      GTextArea,
    },
    setup () {
      return {
        TextAreaState,
      };
    },
    template: `
      <div class="flex flex-col gap-sm" style="max-width: 20rem">
        <GTextArea placeholder="Default" />
        <GTextArea placeholder="Error" :state="TextAreaState.Error" />
        <GTextArea placeholder="Warning" :state="TextAreaState.Warning" />
        <GTextArea placeholder="Success" :state="TextAreaState.Success" />
        <GTextArea placeholder="Disabled" disabled />
      </div>
    `,
  }),
};
