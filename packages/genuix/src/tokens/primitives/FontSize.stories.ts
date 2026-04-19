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

const sizes = [
  {
    token: '--text-1',
    label: 'text-1 (11.1px)',
  },
  {
    token: '--text-2',
    label: 'text-2 (13.3px)',
  },
  {
    token: '--text-3',
    label: 'text-3 (16px)',
  },
  {
    token: '--text-4',
    label: 'text-4 (19.2px)',
  },
  {
    token: '--text-5',
    label: 'text-5 (23px)',
  },
  {
    token: '--text-6',
    label: 'text-6 (27.6px)',
  },
  {
    token: '--text-7',
    label: 'text-7 (33.2px)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 16px;',
    },
    sizes.map((s) =>
      h('div', {
        style: 'display: flex; align-items: baseline; gap: 12px;',
      }, [
        h('code', {
          style: 'font-size: 12px; color: #666; min-width: 200px;',
        }, s.label),
        h('span', {
          style: `font-size: var(${s.token});`,
        }, 'The quick brown fox'),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Font size',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Type scale built on a minor third ratio (1.2) with 16px base.',
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
        story: 'Font size scale using minor third ratio (1.2), base 16px.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
