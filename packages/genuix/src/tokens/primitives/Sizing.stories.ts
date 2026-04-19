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
    token: '--size-1',
    label: 'size-1 (12px)',
  },
  {
    token: '--size-2',
    label: 'size-2 (16px)',
  },
  {
    token: '--size-3',
    label: 'size-3 (20px)',
  },
  {
    token: '--size-4',
    label: 'size-4 (24px)',
  },
  {
    token: '--size-5',
    label: 'size-5 (32px)',
  },
  {
    token: '--size-6',
    label: 'size-6 (40px)',
  },
  {
    token: '--size-7',
    label: 'size-7 (48px)',
  },
  {
    token: '--size-8',
    label: 'size-8 (64px)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 12px;',
    },
    sizes.map((s) =>
      h('div', {
        style: 'display: flex; align-items: center; gap: 12px;',
      }, [
        h('code', {
          style: 'font-size: 12px; color: #666; min-width: 160px;',
        }, s.label),
        h('div', {
          style: `
            width: var(${s.token});
            height: var(${s.token});
            background: var(--color-accent-blue-9);
            border-radius: 2px;
          `,
        }),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Sizing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Fixed component sizes on a 4px grid. For icons, avatars, and controls.',
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
        story: 'Fixed component sizes on 4px grid. Used for icon containers, avatars, controls.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
