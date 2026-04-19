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

const radii = [
  {
    token: '--radius-1',
    label: 'radius-1 (2px)',
  },
  {
    token: '--radius-2',
    label: 'radius-2 (4px)',
  },
  {
    token: '--radius-3',
    label: 'radius-3 (8px)',
  },
  {
    token: '--radius-4',
    label: 'radius-4 (12px)',
  },
  {
    token: '--radius-5',
    label: 'radius-5 (16px)',
  },
];

function Preview () {
  return h(
    'div',
    {
      style: 'display: flex; gap: 16px; flex-wrap: wrap;',
    },
    radii.map((r) =>
      h('div', {
        style: 'display: flex; flex-direction: column; align-items: center; gap: 8px;',
      }, [
        h('div', {
          style: `
            width: 64px;
            height: 64px;
            background: var(--color-accent-blue-9);
            border-radius: var(${r.token});
          `,
        }),
        h('code', {
          style: 'font-size: 11px; color: #666;',
        }, r.label),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Radius',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Border radius scale on 2/4px grid.',
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
        story: 'Border radius scale snapped to 2/4px grid.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
