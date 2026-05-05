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
          style: 'font-size: 11px; color: inherit; opacity: 0.6; min-width: 100px;',
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

function Panel (label: string, inverted: boolean) {
  return h('div', {
    class: inverted ? 'inverted' : undefined,
    style: `
      padding: 24px;
      border-radius: 8px;
      background: var(--gui-neutral-bg);
      border: 1px solid var(--gui-neutral-border-subtle);
      color: var(--gui-neutral-fg);
    `,
  }, [
    h('h2', {
      style: 'font-size: 16px; font-weight: 700; margin-bottom: 16px;',
    }, label),
    ...roles.map(SwatchRow),
  ]);
}

const meta = {
  title: 'Tokens/Inverted',
  tags: [],
  parameters: {
    docs: {
      description: {
        component: 'The .inverted class flips color primitives for a subtree. In light mode it applies dark primitives, in dark mode it applies light primitives.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBySide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal and inverted panels side by side. The inverted panel shows the opposite color scheme.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h('div', {
        style: 'display: flex; gap: 24px; flex-wrap: wrap;',
      }, [
        h('div', {
          style: 'flex: 1; min-width: 320px;',
        }, [Panel('Normal', false)]),
        h('div', {
          style: 'flex: 1; min-width: 320px;',
        }, [Panel('Inverted', true)]),
      ]);
    },
  }),
};

export const NestedExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An inverted section with components inside. All semantic tokens automatically flip.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h('div', {
        style: 'display: flex; flex-direction: column; gap: 16px;',
      }, [
        h('div', {
          style: `
            padding: 24px;
            border-radius: 8px;
            background: var(--gui-neutral-bg);
            border: 1px solid var(--gui-neutral-border-subtle);
            color: var(--gui-neutral-fg);
          `,
        }, [
          h('p', {
            style: 'font-size: 14px; margin-bottom: 12px;',
          }, 'This is a normal section.'),
          h('div', {
            style: 'display: flex; gap: 8px;',
          }, [
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-primary-solid); color: var(--gui-primary-bg); font-size: 12px;',
            }, 'Primary'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-danger-solid); color: var(--gui-danger-bg); font-size: 12px;',
            }, 'Danger'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-success-solid); color: var(--gui-success-bg); font-size: 12px;',
            }, 'Success'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-info-solid); color: var(--gui-info-bg); font-size: 12px;',
            }, 'Info'),
          ]),
        ]),
        h('div', {
          class: 'inverted',
          style: `
            padding: 24px;
            border-radius: 8px;
            background: var(--gui-neutral-bg);
            border: 1px solid var(--gui-neutral-border-subtle);
            color: var(--gui-neutral-fg);
          `,
        }, [
          h('p', {
            style: 'font-size: 14px; margin-bottom: 12px;',
          }, 'This is an inverted section. Same markup, opposite colors.'),
          h('div', {
            style: 'display: flex; gap: 8px;',
          }, [
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-primary-solid); color: var(--gui-primary-bg); font-size: 12px;',
            }, 'Primary'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-danger-solid); color: var(--gui-danger-bg); font-size: 12px;',
            }, 'Danger'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-success-solid); color: var(--gui-success-bg); font-size: 12px;',
            }, 'Success'),
            h('div', {
              style: 'padding: 8px 16px; border-radius: 6px; background: var(--gui-info-solid); color: var(--gui-info-bg); font-size: 12px;',
            }, 'Info'),
          ]),
        ]),
      ]);
    },
  }),
};
