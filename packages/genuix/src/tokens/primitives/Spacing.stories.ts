/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  h,
} from 'vue';

const spacings = [
  {
    token: '--spacing-1',
    label: 'spacing-1 (4px)',
  },
  {
    token: '--spacing-2',
    label: 'spacing-2 (8px)',
  },
  {
    token: '--spacing-3',
    label: 'spacing-3 (12px)',
  },
  {
    token: '--spacing-4',
    label: 'spacing-4 (16px)',
  },
  {
    token: '--spacing-5',
    label: 'spacing-5 (20px)',
  },
  {
    token: '--spacing-6',
    label: 'spacing-6 (24px)',
  },
  {
    token: '--spacing-8',
    label: 'spacing-8 (32px)',
  },
  {
    token: '--spacing-10',
    label: 'spacing-10 (40px)',
  },
  {
    token: '--spacing-12',
    label: 'spacing-12 (48px)',
  },
  {
    token: '--spacing-16',
    label: 'spacing-16 (64px)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 12px;',
    },
    spacings.map((s) =>
      h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h('code', {
          style: 'font-size: 12px; color: #666; min-width: 180px;',
        }, s.label),
        h('div', {
          style: `
            width: var(${s.token});
            height: 24px;
            background: var(--color-accent-blue-9);
            border-radius: 2px;
          `,
        }),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Spacing scale on a 4px base grid. Powers padding, margin, gap, and size utilities.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spacing scale on 4px base grid. Used for padding, margin, gap.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
