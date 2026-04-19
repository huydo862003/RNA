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

const layers = [
  {
    token: '--z-base',
    label: 'z-base (0)',
  },
  {
    token: '--z-dropdown',
    label: 'z-dropdown (100)',
  },
  {
    token: '--z-sticky',
    label: 'z-sticky (200)',
  },
  {
    token: '--z-overlay',
    label: 'z-overlay (300)',
  },
  {
    token: '--z-modal',
    label: 'z-modal (400)',
  },
  {
    token: '--z-toast',
    label: 'z-toast (500)',
  },
  {
    token: '--z-tooltip',
    label: 'z-tooltip (600)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 8px;',
    },
    layers.map((l, i) =>
      h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h('code', {
          style: 'font-size: 12px; color: #666; min-width: 180px;',
        }, l.label),
        h('div', {
          style: `
            width: ${60 + i * 40}px;
            height: 28px;
            background: var(--color-accent-blue-${12 < 3 + i ? 12 : 3 + i});
            border-radius: 4px;
          `,
        }),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Z-index',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Stacking context layers separated by 100 for intermediate values.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Layers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Z-index stacking layers. Each level separated by 100 to leave room for intermediate values.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
