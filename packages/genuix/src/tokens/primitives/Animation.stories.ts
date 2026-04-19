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

const easings = [
  {
    token: '--ease-default',
    label: 'ease-default',
  },
  {
    token: '--ease-in',
    label: 'ease-in',
  },
  {
    token: '--ease-out',
    label: 'ease-out',
  },
  {
    token: '--ease-in-out',
    label: 'ease-in-out',
  },
];

function Preview () {
  return h('div', [
    h('h3', {
      style: 'margin-bottom: 12px; font-size: 14px; font-weight: 600;',
    }, 'Easings (hover to see)'),
    h(
      'div',
      {
        style: 'display: flex; flex-direction: column; gap: 8px;',
      },
      easings.map((e) =>
        h('div', {
          style: 'display: flex; align-items: center; gap: 12px;',
        }, [
          h('code', {
            style: 'font-size: 12px; color: #666; min-width: 220px;',
          }, e.label),
          h('div', {
            style: `
              width: 40px; height: 40px;
              background: var(--color-accent-blue-9);
              border-radius: 4px;
              transition: transform 300ms var(${e.token});
              cursor: pointer;
            `,
            onMouseenter: (ev: MouseEvent) => {
              (ev.target as HTMLElement).style.transform = 'translateX(100px)';
            },
            onMouseleave: (ev: MouseEvent) => {
              (ev.target as HTMLElement).style.transform = '';
            },
          }),
        ])),
    ),
  ]);
}

const meta = {
  title: 'Tokens/Primitives/Animation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Easing curves for transitions and animations.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Easings: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Easing curves for transitions. Hover boxes to preview each curve at 300ms.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
