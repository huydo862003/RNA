/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GThemeToggle from './GThemeToggle.vue';

const meta = {
  title: 'Components/Interaction/GThemeToggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dark/light mode toggle button. Uses useTheme() composable internally.',
      },
    },
  },
  component: GThemeToggle,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GThemeToggle,
    },
    template: '<GThemeToggle />',
  }),
};

export const Large: Story = {
  render: () => ({
    components: {
      GThemeToggle,
    },
    template: '<GThemeToggle :size="24" />',
  }),
};
