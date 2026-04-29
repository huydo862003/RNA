/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GInlineMath from './GInlineMath.vue';

const meta = {
  title: 'Components/Display/Math/GInlineMath',
  tags: ['autodocs'],
  component: GInlineMath,
  args: {
    tex: 'E = mc^2',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<p>The equation <GInlineMath tex="E = mc^2" /> is famous.</p>',
      },
    },
  },
  render: () => ({
    components: {
      GInlineMath,
    },
    template: `
      <p class="text-md gui-neutral-fg leading-relaxed">
        The energy-mass equivalence <GInlineMath tex="E = mc^2" /> was proposed by Einstein.
        Given a quadratic <GInlineMath tex="ax^2 + bx + c = 0" />, the solutions are
        <GInlineMath tex="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" />.
      </p>
    `,
  }),
};

export const ErrorHandlingStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Invalid LaTeX renders gracefully without crashing.',
      },
      source: {
        code: '<GInlineMath tex="\\invalid{" />',
      },
    },
  },
  render: () => ({
    components: {
      GInlineMath,
    },
    template: `
      <p class="text-md gui-neutral-fg">
        Invalid inline: <GInlineMath tex="\\invalid{" />
      </p>
    `,
  }),
};
