/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import RComponent from './Component.vue';

const meta = {
  title: 'Components/RComponent',
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  tags: ['autodocs'], // auto-generate a comprehensive documentation
  args: {}, // Component props used in default documentation
  argTypes: {}, // Explain each prop
  component: RComponent,
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
      code: ``, // Minimal working code snippet
    },
  },
  render: (args) => ({
    components: { Component },
    setup() {
      return { args };
    },
    template: `
      <code snippet to render here>
    `,
  }),
};
