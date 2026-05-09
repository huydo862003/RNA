<template>
  <div
    v-bind="$attrs"
    class="table-root"
  >
    <slot name="filter" />
    <div class="table-scroll">
      <table
        class="table"
        :class="{
          'table--bordered': !noBorder,
        }"
        :style="rowHeight
          ? {
            '--table-row-height': rowHeight,
          }
          : undefined"
      >
        <slot />
      </table>
    </div>
    <slot name="footer">
      <GTablePaginator />
    </slot>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  provide,
  ref,
  watch,
} from 'vue';
import {
  TABLE_KEY,
} from './types';
import GTablePaginator from './GTablePaginator.vue';

defineOptions({
  inheritAttrs: false,
});

const sortKey = defineModel<string>('sortKey', {
  default: '',
});
const sortAsc = defineModel<boolean>('sortAsc', {
  default: true,
});
const page = defineModel<number>('page', {
  default: 1,
});

const {
  pageSize = 10,
  rowHeight = 'var(--spacing-3xl)',
  noBorder = false,
} = defineProps<{
  /** Number of rows per page */
  pageSize?: number;
  /** CSS height for each row */
  rowHeight?: string | null;
  /** Hide borders between cells */
  noBorder?: boolean;
}>();

const filter = ref('');

// Map each data record to its index
const rowKeyMap = new WeakMap<Record<string, unknown>, number>();

let rowKeyCounter = 0;
const registeredRows = ref<Map<number, Record<string, unknown>>>(new Map());

function handleSort (key: string) {
  if (sortKey.value !== key) {
    sortKey.value = key;
    sortAsc.value = true;
  } else if (sortAsc.value) {
    sortAsc.value = false;
  } else {
    sortKey.value = '';
  }
}

function registerRow (rowData: Record<string, unknown>) {
  if (!rowKeyMap.has(rowData)) {
    rowKeyMap.set(rowData, rowKeyCounter++);
  }
  const rowKey = rowKeyMap.get(rowData)!;

  registeredRows.value.set(rowKey, rowData);
  registeredRows.value = new Map(registeredRows.value);

  return rowKey;
}

function setFilter (value: string) {
  filter.value = value;
}

function setPage (n: number) {
  page.value = n;
}

function unregisterRow (rowData: Record<string, unknown>) {
  const rowKey = rowKeyMap.get(rowData);

  if (rowKey !== undefined) {
    registeredRows.value.delete(rowKey);
    registeredRows.value = new Map(registeredRows.value);
  }
}

const filteredRows = computed(() => {
  const filterText = filter.value.toLowerCase();

  return [...registeredRows.value.entries()].filter(([
    , data,
  ]) =>
    !filterText || Object.values(data).some((value) => String(value).toLowerCase()
      .includes(filterText)));
});

const sortedRows = computed(() => {
  const key = sortKey.value;

  if (!key) return filteredRows.value;

  return [...filteredRows.value].sort(([
    , rowA,
  ], [
    , rowB,
  ]) => {
    const valueA = rowA[key];
    const valueB = rowB[key];
    const numA = Number(valueA);
    const numB = Number(valueB);
    const cmp = !Number.isNaN(numA) && !Number.isNaN(numB)
      ? numA - numB
      : String(valueA).localeCompare(String(valueB));

    return sortAsc.value ? cmp : -cmp;
  });
});

const itemsPerPage = computed(() => {
  return 0 < pageSize ? pageSize : sortedRows.value.length;
});

const paginatedRows = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;

  return sortedRows.value.slice(start, start + itemsPerPage.value);
});

const paginatedRowKeys = computed(() => paginatedRows.value.map(([key]) => key));

const maxPages = computed(() => {
  const size = itemsPerPage.value;

  return 0 < size ? Math.ceil(sortedRows.value.length / size) : 1;
});

const isVisible = (rowKey: number) => paginatedRowKeys.value.includes(rowKey);
const getOrder = (rowKey: number) => paginatedRowKeys.value.indexOf(rowKey);
const paginatedData = computed(() => paginatedRows.value.map(([
  , data,
]) => data));

watch(filter, () => {
  page.value = 1;
});

provide(TABLE_KEY, {
  sortKey: computed(() => sortKey.value),
  sortAsc: computed(() => sortAsc.value),
  page: computed(() => page.value),
  pages: computed(() => pageSize),
  filter: computed(() => filter.value),
  maxPages,
  handleSort,
  setFilter,
  setPage,
  registerRow,
  unregisterRow,
  isVisible,
  getOrder,
  paginatedData,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.table-root {
  width: 100%;
}

.table-scroll {
  overflow-x: auto;
  min-height: var(--spacing-3xl);
}

.table {
  width: 100%;
  font-size: var(--text-xs);
  border-collapse: collapse;
}

.table--bordered :deep(thead tr) {
  border-bottom: 1px solid var(--gui-neutral-border);
}

.table--bordered :deep(tbody tr) {
  border-bottom: 1px solid var(--gui-neutral-border-subtle);
}

.table--bordered :deep(tbody tr:last-child) {
  border-bottom: none;
}

.table :deep(th),
.table :deep(td) {
  height: var(--table-row-height, auto);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
}
</style>
