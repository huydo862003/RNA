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
  title: 'Components/Display/GIcon',
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

export const DefaultIconStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single icon by name.',
      },
      source: {
        code: '<GIcon :name="GIconName.Home" />',
      },
    },
  },
  args: {
    name: GIconName.Home,
  },
};

export const SizedIconStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon sized via class/style fallthrough.',
      },
      source: {
        code: '<GIcon :name="GIconName.Star" class="w-size-5 h-size-5" />',
      },
    },
  },
  render: () => ({
    components: {
      GIcon,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: '<GIcon :name="GIconName.Star" class="w-size-5 h-size-5" />',
  }),
};

export const CustomIconStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom SVG component passed via `icon` prop.',
      },
      source: {
        code: '<GIcon :icon="customSvgComponent" />',
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
    template: '<GIcon :icon="customSvg" class="w-size-4 h-size-4" />',
  }),
};

export const AllIconsStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all built-in icons.',
      },
      source: {
        code: '<GIcon :name="GIconName.Home" />',
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
      <div class="flex flex-wrap gap-spacing-4">
        <div
          v-for="icon in icons"
          :key="icon"
          class="flex flex-col items-center gap-spacing-1 w-[80px]"
        >
          <GIcon :name="icon" class="w-size-4 h-size-4" />
          <span class="text-xs gui-neutral-fg-muted text-center break-all">{{ icon }}</span>
        </div>
      </div>
    `,
  }),
};
