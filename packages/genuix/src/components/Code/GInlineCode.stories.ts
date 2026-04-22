/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GInlineCode from './GInlineCode.vue';

const meta = {
  title: 'Components/GInlineCode',
  tags: ['autodocs'],
  component: GInlineCode,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInlineCodeStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Inline code in a sentence',
      },
    },
  },
  render: () => ({
    components: {
      GInlineCode,
    },
    template: `
      <p class="text-sm gui-neutral-fg">
        Use <GInlineCode>npm install</GInlineCode> to install dependencies.
      </p>
    `,
  }),
};

export const MultipleInlineCodeStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple inline code in paragraph',
      },
    },
  },
  render: () => ({
    components: {
      GInlineCode,
    },
    template: `
      <p class="text-sm gui-neutral-fg">
        Run <GInlineCode>pnpm build</GInlineCode> then <GInlineCode>pnpm test</GInlineCode> before pushing.
      </p>
    `,
  }),
};
