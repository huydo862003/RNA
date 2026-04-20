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
import GIcon from './GIcon.vue';
import {
  GIconName,
} from './types';

const meta = {
  title: 'Components/GIcon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Icon component backed by Phosphor Icons. Use `name` for built-in icons or `icon` for custom components.',
      },
    },
  },
  component: GIcon,
  argTypes: {
    name: {
      control: 'select',
      options: Object.values(GIconName),
      description: 'Named icon from GIconName enum',
    },
    alt: {
      control: 'text',
      description: 'Accessible alt text',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single icon by name.',
      },
    },
  },
  args: {
    name: GIconName.Home,
  },
};

export const Sized: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon sized via class/style fallthrough.',
      },
    },
  },
  render: () => ({
    components: { GIcon },
    setup () {
      return { GIconName };
    },
    template: '<GIcon :name="GIconName.Star" style="width: 32px; height: 32px;" />',
  }),
};

export const CustomIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom SVG component passed via `icon` prop.',
      },
    },
  },
  render: () => ({
    components: {
      GIcon,
    },
    setup () {
      const customSvg = h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
      }, [
        h('circle', {
          cx: 12,
          cy: 12,
          r: 10,
        }),
      ]);
      return {
        customSvg,
      };
    },
    template: '<GIcon :icon="customSvg" style="width: 24px; height: 24px;" />',
  }),
};

export const AllIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all built-in icons.',
      },
    },
  },
  render: () => ({
    components: {
      GIcon,
    },
    setup () {
      return {
        icons: Object.values(GIconName),
      };
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <div
          v-for="icon in icons"
          :key="icon"
          style="display: flex; flex-direction: column; align-items: center; gap: 4px; width: 80px;"
        >
          <GIcon :name="icon" style="width: 24px; height: 24px;" />
          <span style="font-size: 10px; color: #666; text-align: center; word-break: break-all;">{{ icon }}</span>
        </div>
      </div>
    `,
  }),
};
