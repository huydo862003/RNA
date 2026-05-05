/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta, StoryObj,
} from '@storybook/vue3-vite';
import GFilterable from './GFilterable.vue';
import GFilterableItem from './GFilterableItem.vue';
import GFilterableSearchBox from './GFilterableSearchBox.vue';
import GFilterablePaginator from './GFilterablePaginator.vue';

const items = [
  'Alpha',
  'Beta',
  'Gamma',
  'Delta',
  'Epsilon',
  'Zeta',
  'Eta',
  'Theta',
  'Iota',
  'Kappa',
  'Lambda',
  'Mu',
];

const meta = {
  title: 'Components/Display/GFilterable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compound filterable list with search and pagination.',
      },
    },
  },
  component: GFilterable,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GFilterable,
      GFilterableItem,
      GFilterableSearchBox,
    },
    template: `
      <GFilterable label="Greek Letters" columns="2">
        <template #search>
          <GFilterableSearchBox placeholder="Search..." />
        </template>
        <GFilterableItem
          v-for="item in items"
          :key="item"
          :value="item"
          :label="item"
        >
          <template #default="{ value }">
            {{ value }}
          </template>
        </GFilterableItem>
      </GFilterable>
    `,
    setup: () => ({
      items,
    }),
  }),
};

export const WithPagination: Story = {
  render: () => ({
    components: {
      GFilterable,
      GFilterableItem,
      GFilterableSearchBox,
      GFilterablePaginator,
    },
    template: `
      <GFilterable label="Greek Letters" columns="2" :page-size="2">
        <template #search>
          <GFilterableSearchBox placeholder="Search..." />
        </template>
        <GFilterableItem
          v-for="item in items"
          :key="item"
          :value="item"
          :label="item"
        >
          <template #default="{ value }">
            {{ value }}
          </template>
        </GFilterableItem>
        <template #footer>
          <GFilterablePaginator />
        </template>
      </GFilterable>
    `,
    setup: () => ({
      items,
    }),
  }),
};

export const WithLinks: Story = {
  render: () => ({
    components: {
      GFilterable,
      GFilterableItem,
      GFilterableSearchBox,
    },
    template: `
      <GFilterable label="Links" columns="1">
        <template #search>
          <GFilterableSearchBox placeholder="Search..." />
        </template>
        <GFilterableItem
          v-for="item in items"
          :key="item"
          :value="item"
          :label="item"
        >
          <template #default="{ value }">
            <a href="#" style="color: var(--gui-info-fg-muted); text-decoration: none;">
              {{ value }}
            </a>
          </template>
        </GFilterableItem>
      </GFilterable>
    `,
    setup: () => ({
      items,
    }),
  }),
};
