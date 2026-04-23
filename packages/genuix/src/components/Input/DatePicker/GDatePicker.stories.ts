/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GDatePicker from './GDatePicker.vue';

const meta = {
  title: 'Components/Input/GDatePicker',
  parameters: {
    docs: {
      description: {
        component: 'A component to pick date and time',
      },
    },
  },
  tags: ['autodocs'], // auto-generate a comprehensive documentation
  args: {}, // Component props used in default documentation
  argTypes: {}, // Explain each prop
  component: GDatePicker,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicStory: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Description of the story',
      },
    },
    source: {
      code: '', // Minimal working code snippet
    },
  },
  render: (args) => ({
    components: {
      GDatePicker,
    },
    setup () {
      return {
        args,
      };
    },
    template: `
      <GDatePicker />
    `,
  }),
};
