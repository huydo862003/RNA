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

const heights = [
  {
    token: '--leading-1',
    label: 'leading-1 (16px)',
  },
  {
    token: '--leading-2',
    label: 'leading-2 (20px)',
  },
  {
    token: '--leading-3',
    label: 'leading-3 (24px)',
  },
  {
    token: '--leading-4',
    label: 'leading-4 (28px)',
  },
  {
    token: '--leading-5',
    label: 'leading-5 (32px)',
  },
  {
    token: '--leading-6',
    label: 'leading-6 (36px)',
  },
  {
    token: '--leading-7',
    label: 'leading-7 (40px)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 16px;',
    },
    heights.map((s) =>
      h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h('code', {
          style: 'font-size: 12px; color: #666; min-width: 200px;',
        }, s.label),
        h('div', {
          style: `
            line-height: var(${s.token});
            font-size: 14px;
            background: rgba(0,0,0,0.05);
            padding: 0 8px;
          `,
        }, 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.'),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Line height',
  tags: [],
  parameters: {
    docs: {
      description: {
        component: 'Fixed line heights on a 4px grid. Paired with font sizes in components.',
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
        story: 'Fixed line heights snapped to 4px grid.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
