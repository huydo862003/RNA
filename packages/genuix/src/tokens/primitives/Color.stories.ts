/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  range,
} from '@hdnax/stdx';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  h,
} from 'vue';

const colorScales = [
  {
    name: 'Neutral',
    prefix: '--color-neutral',
  },
  {
    name: 'Primary',
    prefix: '--color-primary',
  },
  {
    name: 'Red',
    prefix: '--color-accent-red',
  },
  {
    name: 'Green',
    prefix: '--color-accent-green',
  },
  {
    name: 'Yellow',
    prefix: '--color-accent-yellow',
  },
  {
    name: 'Blue',
    prefix: '--color-accent-blue',
  },
  {
    name: 'Orange',
    prefix: '--color-accent-orange',
  },
];

// Generate an array from 1 to 12
const steps = [...range(1, 12)];

function Swatch () {
  return h(
    'div',
    {
      style: 'display: flex; flex-direction: column; gap: 24px;',
    },
    colorScales.map((scale) =>
      h('div', [
        h('h3', {
          style: 'margin-bottom: 8px; font-size: 14px; font-weight: 600;',
        }, scale.name),
        h(
          'div',
          {
            style: 'display: flex; gap: 4px;',
          },
          steps.map((step) =>
            h('div', {
              style: `
                width: 48px; height: 48px;
                background: var(${scale.prefix}-${step});
                border-radius: 4px;
                border: 1px solid rgba(0,0,0,0.1);
              `,
              title: `${scale.prefix}-${step}`,
            })),
        ),
      ])),
  );
}

const meta = {
  title: 'Tokens/Primitives/Color',
  tags: [],
  parameters: {
    docs: {
      description: {
        component: 'Primitive color palettes from Radix Colors v3. Each hue has 12 steps following the Radix scale convention.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllScales: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All color scales from Radix Colors. 12 steps per hue, from lightest background to darkest foreground.',
      },
    },
  },
  render: () => ({
    setup () {
      return () => h(Swatch);
    },
  }),
};
