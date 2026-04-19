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

const roles = [
  'neutral',
  'primary',
  'danger',
  'success',
  'warning',
  'info',
  'notice',
];

const tokenGroups = [
  {
    suffix: 'bg',
    steps: [
      '',
      '-subtle',
      '-hover',
      '-active',
    ],
    prop: 'background-color',
    label: 'Background',
  },
  {
    suffix: 'border',
    steps: [
      '-subtle',
      '',
      '-strong',
    ],
    prop: 'border-color',
    label: 'Border',
  },
  {
    suffix: 'solid',
    steps: [
      '',
      '-hover',
    ],
    prop: 'background-color',
    label: 'Solid',
  },
  {
    suffix: 'fg',
    steps: [
      '-muted',
      '',
    ],
    prop: 'color',
    label: 'Foreground',
  },
];

function SwatchRow (role: string) {
  return h('div', {
    style: 'margin-bottom: 24px;',
  }, [
    h('h3', {
      style: 'margin-bottom: 8px; font-size: 14px; font-weight: 600; text-transform: capitalize;',
    }, role),
    ...tokenGroups.map((group) =>
      h('div', {
        style: 'display: flex; align-items: center; gap: 4px; margin-bottom: 4px;',
      }, [
        h('code', {
          style: 'font-size: 11px; color: #666; min-width: 100px;',
        }, group.label),
        ...group.steps.map((step) => {
          const token = `--gui-${role}-${group.suffix}${step}`;
          const isBorder = group.prop === 'border-color';
          const isFg = group.prop === 'color';
          return h('div', {
            style: `
              width: 48px; height: 32px;
              border-radius: 4px;
              ${isBorder ? `border: 3px solid var(${token}); background: transparent;` : ''}
              ${isFg ? `background: transparent; color: var(${token}); font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: 600;` : ''}
              ${!isBorder && !isFg ? `background: var(${token});` : ''}
            `,
            title: token,
          }, isFg ? 'Aa' : undefined);
        }),
      ])),
  ]);
}

function Preview () {
  return h('div', [
    ...roles.map(SwatchRow),
    h('div', {
      style: 'margin-top: 16px;',
    }, [
      h('h3', {
        style: 'margin-bottom: 8px; font-size: 14px; font-weight: 600;',
      }, 'Overlay'),
      h('div', {
        style: `
          width: 120px; height: 48px;
          background: var(--gui-overlay-bg);
          border-radius: 4px;
        `,
        title: '--gui-overlay-bg',
      }),
    ]),
  ]);
}

const meta = {
  title: 'Tokens/Semantic',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Semantic color roles mapped from primitives. Each role provides background, border, solid, and foreground variants.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllRoles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Semantic color roles mapped from primitive scales. Each role has background, border, solid, and foreground variants following the Radix 12-step pattern.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Preview);
    },
  }),
};
