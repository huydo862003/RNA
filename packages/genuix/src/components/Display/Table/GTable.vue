<template>
  <div
    v-bind="$attrs"
    class="g-table-root"
  >
    <slot name="filter" />
    <div class="g-table-scroll">
      <table class="g-table">
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
} = defineProps<{
  pageSize?: number;
}>();

const filter = ref('');

// Map each data record to its index
const rowKeyMap = new WeakMap<Record<string, unknown>, number>();

let rowKeyCounter = 0;
const registeredRows = ref<Map<number, Record<string, unknown>>>(new Map());

function registerRow (rowData: Record<string, unknown>) {
  if (!rowKeyMap.has(rowData)) {
    rowKeyMap.set(rowData, rowKeyCounter++);
  }
  const rowKey = rowKeyMap.get(rowData)!;
  registeredRows.value.set(rowKey, rowData);
  registeredRows.value = new Map(registeredRows.value);
  return rowKey;
}

function unregisterRow (rowData: Record<string, unknown>) {
  const rowKey = rowKeyMap.get(rowData);
  if (rowKey !== undefined) {
    registeredRows.value.delete(rowKey);
    registeredRows.value = new Map(registeredRows.value);
  }
}

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

function setFilter (val: string) {
  filter.value = val;
}

function setPage (n: number) {
  page.value = n;
}

const filteredRows = computed(() => {
  const f = filter.value.toLowerCase();
  return [...registeredRows.value.entries()].filter(([
    , data,
  ]) =>
    !f || Object.values(data).some((v) => String(v).toLowerCase()
      .includes(f)));
});

const sortedRows = computed(() => {
  const key = sortKey.value;
  if (!key) return filteredRows.value;
  return [...filteredRows.value].sort(([
    , a,
  ], [
    , b,
  ]) => {
    const av = a[key];
    const bv = b[key];
    const an = Number(av);
    const bn = Number(bv);
    const cmp = !Number.isNaN(an) && !Number.isNaN(bn)
      ? an - bn
      : String(av).localeCompare(String(bv));
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
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.g-table-root {
  width: 100%;
}

.g-table-scroll {
  overflow-x: auto;
}

.g-table {
  width: 100%;
  font-size: var(--text-xs);
  border-collapse: collapse;
}
}
</style>
