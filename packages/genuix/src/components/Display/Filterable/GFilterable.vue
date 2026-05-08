<template>
  <div
    class="filterable"
  >
    <div class="filterable-header">
      <span
        v-if="label"
        class="filterable-label"
      >{{ label }}</span>
      <slot name="search" />
    </div>
    <ul
      v-bind="$attrs"
      class="filterable-items"
      :data-cols="columns"
    >
      <slot />
    </ul>
    <slot name="footer">
      <GFilterablePaginator />
    </slot>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref,
  provide,
  computed,
  watch,
} from 'vue';
import {
  FILTERABLE_KEY,
} from './types';
import GFilterablePaginator from './GFilterablePaginator.vue';

defineOptions({
  inheritAttrs: false,
});

const {
  label = '',
  columns = 2,
  pageSize = 10,
} = defineProps<{
  label?: string;
  columns?: 1 | 2 | 3;
  pageSize?: number;
}>();

const search = ref('');
const page = ref(1);
const registeredItems = ref<Array<{
  label: string;
  value: string;
}>>([]);

function registerItem (label: string, value: string) {
  registeredItems.value.push({
    label,
    value,
  });
}

function unregisterItem (value: string) {
  registeredItems.value = registeredItems.value.filter((item) => item.value !== value);
}

function setSearch (value: string) {
  search.value = value;
}

function setPage (n: number) {
  page.value = n;
}

const filteredItems = computed(() => {
  const searchText = search.value.toLowerCase();
  if (!searchText) return registeredItems.value;
  return registeredItems.value.filter((item) =>
    item.label.toLowerCase().includes(searchText));
});

const itemsPerPage = computed(() => {
  return 0 < pageSize ? pageSize : filteredItems.value.length;
});

const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

const paginatedItemValues = computed(() => paginatedItems.value.map((item) => item.value));

const maxPages = computed(() => {
  const size = itemsPerPage.value;
  return 0 < size ? Math.ceil(filteredItems.value.length / size) : 1;
});

const isVisible = (value: string) => paginatedItemValues.value.includes(value);

watch(search, () => {
  page.value = 1;
});

watch(filteredItems, () => {
  if (maxPages.value < page.value) {
    page.value = Math.max(1, maxPages.value);
  }
});

provide(FILTERABLE_KEY, {
  search: computed(() => search.value),
  page: computed(() => page.value),
  pages: computed(() => pageSize),
  maxPages,
  setSearch,
  setPage,
  registerItem,
  unregisterItem,
  isVisible,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.filterable {
  margin-bottom: var(--spacing-lg);
}

.filterable-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.filterable-label {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--gui-neutral-fg-muted);
}

.filterable-items {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-right: var(--spacing-sm);
  padding-top: var(--spacing-xs);
  overflow-y: auto;
  display: grid;
  gap: var(--spacing-sm);
}

.filterable-items[data-cols="1"] {
  grid-template-columns: 1fr;
}

.filterable-items[data-cols="2"] {
  grid-template-columns: repeat(2, 1fr);
}

.filterable-items[data-cols="3"] {
  grid-template-columns: repeat(3, 1fr);
}
}
</style>
