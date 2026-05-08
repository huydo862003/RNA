/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GCard from './GCard.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A simple card with icon, title, description, and footer slots.',
      },
    },
  },
  component: GCard,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GCard,
      GIcon,
    },
    setup: () => ({
      GIconName,
    }),
    template: `
      <GCard style="max-width: 280px">
        <template #icon>
          <GIcon :name="GIconName.TreeStructure" class="gui-neutral-bg-subtle size-5 rounded-md p-2 border gui-neutral-border" />
        </template>
        <template #title>SQL Parser</template>
        <template #description>
          Turn any SQL string into a clean AST. A robust JavaScript SQL parser that works across 33+ dialects.
        </template>
      </GCard>
    `,
  }),
};

export const NoIcon: Story = {
  render: () => ({
    components: {
      GCard,
      GIcon,
    },
    setup: () => ({
      GIconName,
    }),
    template: `
      <GCard style="max-width: 280px">
        <template #title>SQL Parser</template>
        <template #description>
          Turn any SQL string into a clean AST. A robust JavaScript SQL parser that works across 33+ dialects.
        </template>
      </GCard>
    `,
  }),
};

export const Grid: Story = {
  render: () => ({
    components: {
      GCard,
      GIcon,
    },
    setup () {
      const features = [
        {
          title: 'SQL Parser',
          icon: GIconName.TreeStructure,
          desc: 'Parse SQL into AST across 33+ dialects.',
        },
        {
          title: 'SQL Transpiler',
          icon: GIconName.ArrowsLeftRight,
          desc: 'Convert SQL between dialects.',
        },
        {
          title: 'SQL Optimizer',
          icon: GIconName.MagicWand,
          desc: 'Predicate pushdown, subquery elimination.',
        },
        {
          title: 'SQL Engine',
          icon: GIconName.Play,
          desc: 'Run SQL in-process for tests and sandboxes.',
        },
      ];
      return {
        features,
      };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 600px">
        <GCard v-for="f in features" :key="f.title">
          <template #icon>
            <GIcon :name="f.icon" class="gui-neutral-bg-subtle size-5 rounded-md p-2 border gui-neutral-border" />
          </template>
          <template #title>{{ f.title }}</template>
          <template #description>{{ f.desc }}</template>
        </GCard>
      </div>
    `,
  }),
};
