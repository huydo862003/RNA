/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GInlineMath from './GInlineMath.vue';
import GMathBlock from './GMathBlock.vue';

const meta = {
  title: 'Components/Display/Math/GMathBlock',
  tags: ['autodocs'],
  component: GMathBlock,
  args: {
    tex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GMathBlock tex="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}" />',
      },
    },
  },
  render: () => ({
    components: {
      GMathBlock,
    },
    template: `
      <div class="flex flex-col gap-md">
        <GMathBlock tex="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}" />
        <GMathBlock tex="\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}" />
        <GMathBlock tex="\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}" />
      </div>
    `,
  }),
};

export const MatrixStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GMathBlock tex="A = \\begin{pmatrix} 1 & 2 \\\\\\\\ 3 & 4 \\end{pmatrix}" />',
      },
    },
  },
  render: () => ({
    components: {
      GMathBlock,
    },
    template: `
      <div class="flex flex-col gap-md">
        <GMathBlock tex="A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad \\det(A) = ad - bc" />
        <GMathBlock tex="\\mathbf{x} = A^{-1}\\mathbf{b}" />
      </div>
    `,
  }),
};

export const MixedContentStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Inline and block math used together.',
      },
      source: {
        code: `<p>Let <GInlineMath tex="f(x)" /> be defined as:</p>
<GMathBlock tex="f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n" />`,
      },
    },
  },
  render: () => ({
    components: {
      GInlineMath,
      GMathBlock,
    },
    template: `
      <div class="flex flex-col gap-md">
        <p class="text-md gui-neutral-fg leading-relaxed">
          Let <GInlineMath tex="f(x)" /> be a smooth function. Its Taylor series around <GInlineMath tex="a" /> is:
        </p>
        <GMathBlock tex="f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n" />
        <p class="text-md gui-neutral-fg leading-relaxed">
          For <GInlineMath tex="a = 0" />, this simplifies to the Maclaurin series.
        </p>
      </div>
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
        code: '<GMathBlock tex="\\broken{latex" />',
      },
    },
  },
  render: () => ({
    components: {
      GMathBlock,
    },
    template: '<GMathBlock tex="\\broken{latex" />',
  }),
};
