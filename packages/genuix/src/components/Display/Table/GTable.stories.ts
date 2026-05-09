/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GTable from './GTable.vue';
import GTableHeader from './GTableHeader.vue';
import GTableBody from './GTableBody.vue';
import GTableRow from './GTableRow.vue';
import GTableCell from './GTableCell.vue';
import GTablePaginator from './GTablePaginator.vue';
import GTableFilter from './GTableFilter.vue';
import GTableSorter from './GTableSorter.vue';
import type {
  GTableColumn,
} from './types';

const columns: GTableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'date',
    label: 'Date',
    sortable: true,
  },
];

const rows = [
  {
    name: 'Alpha',
    status: 'Active',
    date: '2026-01-15',
  },
  {
    name: 'Beta',
    status: 'Paused',
    date: '2026-02-20',
  },
  {
    name: 'Gamma',
    status: 'Completed',
    date: '2025-12-01',
  },
  {
    name: 'Delta',
    status: 'Active',
    date: '2026-03-10',
  },
];

const meta = {
  title: 'Components/Display/GTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compound table with sortable columns, pagination, and filter.',
      },
    },
  },
  component: GTable,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GTable,
      GTableHeader,
      GTableBody,
      GTableRow,
      GTableCell,
      GTablePaginator,
    },
    template: `
      <GTable :page-size="2">
        <GTableHeader :columns="columns" />
        <GTableBody v-slot="{ rows: visibleRows }">
          <GTableRow v-for="(row, index) in visibleRows" :key="index" :row-data="row">
            <GTableCell>{{ row.name }}</GTableCell>
            <GTableCell>{{ row.status }}</GTableCell>
            <GTableCell>{{ row.date }}</GTableCell>
          </GTableRow>
        </GTableBody>
        <template #footer>
          <GTablePaginator />
        </template>
      </GTable>
    `,
    setup: () => ({
      columns,
      rows,
    }),
  }),
};

export const NoPagination: Story = {
  render: () => ({
    components: {
      GTable,
      GTableHeader,
      GTableBody,
      GTableRow,
      GTableCell,
    },
    template: `
      <GTable>
        <GTableHeader :columns="columns" />
        <GTableBody v-slot="{ rows: visibleRows }">
          <GTableRow v-for="(row, index) in visibleRows" :key="index" :row-data="row">
            <GTableCell>{{ row.name }}</GTableCell>
            <GTableCell>{{ row.status }}</GTableCell>
            <GTableCell>{{ row.date }}</GTableCell>
          </GTableRow>
        </GTableBody>
      </GTable>
    `,
    setup: () => ({
      columns,
      rows,
    }),
  }),
};

export const WithFilter: Story = {
  render: () => ({
    components: {
      GTable,
      GTableHeader,
      GTableBody,
      GTableRow,
      GTableCell,
      GTableFilter,
    },
    template: `
      <GTable>
        <template #filter>
          <GTableFilter placeholder="Filter rows..." />
        </template>
        <GTableHeader :columns="columns" />
        <GTableBody v-slot="{ rows: visibleRows }">
          <GTableRow v-for="(row, index) in visibleRows" :key="index" :row-data="row">
            <GTableCell>{{ row.name }}</GTableCell>
            <GTableCell>{{ row.status }}</GTableCell>
            <GTableCell>{{ row.date }}</GTableCell>
          </GTableRow>
        </GTableBody>
      </GTable>
    `,
    setup: () => ({
      columns,
      rows,
    }),
  }),
};

export const CustomHeader: Story = {
  render: () => ({
    components: {
      GTable,
      GTableHeader,
      GTableBody,
      GTableRow,
      GTableCell,
      GTableSorter,
    },
    template: `
      <GTable>
        <GTableHeader>
          <tr>
            <GTableCell header>
              Name <GTableSorter col-key="name" />
            </GTableCell>
            <GTableCell header>Status</GTableCell>
            <GTableCell header>
              Date <GTableSorter col-key="date" />
            </GTableCell>
          </tr>
        </GTableHeader>
        <GTableBody v-slot="{ rows: visibleRows }">
          <GTableRow v-for="(row, index) in visibleRows" :key="index" :row-data="row">
            <GTableCell>{{ row.name }}</GTableCell>
            <GTableCell>{{ row.status }}</GTableCell>
            <GTableCell>{{ row.date }}</GTableCell>
          </GTableRow>
        </GTableBody>
      </GTable>
    `,
    setup: () => ({
      rows,
    }),
  }),
};
