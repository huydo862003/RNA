/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GDataTable from './GDataTable.vue';

const meta = {
  title: 'Components/Display/GDataTable',
  tags: ['autodocs'],
  component: GDataTable,
} satisfies Meta;

interface Repo {
  name: string;
  language: string;
  stars: string;
  license: string;
}

export default meta;

type Story = StoryObj<typeof meta>;

const columns = [
  {
    key: 'name' as const,
    label: 'Name',
  },
  {
    key: 'language' as const,
    label: 'Language',
  },
  {
    key: 'stars' as const,
    label: 'Stars',
    align: 'right' as const,
  },
  {
    key: 'license' as const,
    label: 'License',
    align: 'center' as const,
  },
];

const rows: Repo[] = [
  {
    name: 'Vue',
    language: 'TypeScript',
    stars: '46k',
    license: 'MIT',
  },
  {
    name: 'React',
    language: 'JavaScript',
    stars: '228k',
    license: 'MIT',
  },
  {
    name: 'Svelte',
    language: 'TypeScript',
    stars: '80k',
    license: 'MIT',
  },
  {
    name: 'Angular',
    language: 'TypeScript',
    stars: '96k',
    license: 'MIT',
  },
];

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GDataTable :columns="columns" :rows="rows" />',
      },
    },
  },
  render: () => ({
    components: {
      GDataTable,
    },
    setup () {
      return {
        columns,
        rows,
      };
    },
    template: '<GDataTable :columns="columns" :rows="rows" style=\'width: 480px\' />',
  }),
};

export const AutoColumnsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<!-- columns derived from row keys -->
<GDataTable :rows="rows" />`,
      },
    },
  },
  render: () => ({
    components: {
      GDataTable,
    },
    setup () {
      return {
        rows,
      };
    },
    template: '<GDataTable :rows="rows" style=\'width: 480px\' />',
  }),
};

export const CustomCellStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GDataTable :columns="columns" :rows="rows">
  <template #cell-stars="{ value }">
    <strong>{{ value }}</strong> &#x2B50;
  </template>
  <template #header-name="{ column }">
    <span style="color: var(--gui-primary-solid)">{{ column.label }}</span>
  </template>
</GDataTable>`,
      },
    },
  },
  render: () => ({
    components: {
      GDataTable,
    },
    setup () {
      return {
        columns,
        rows,
      };
    },
    template: `
      <GDataTable :columns="columns" :rows="rows" style='width: 480px'>
        <template #cell-stars="{ value }">
          <strong>{{ value }}</strong> &#x2B50;
        </template>
        <template #header-name="{ column }">
          <span style="color: var(--gui-primary-solid)">{{ column.label }}</span>
        </template>
      </GDataTable>
    `,
  }),
};
