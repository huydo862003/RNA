<template>
  <thead>
    <slot>
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          :class="[column.class, { 'g-table-sortable': column.sortable }]"
          @click="column.sortable && (column.onSort ? column.onSort(column.key) : ctx?.handleSort(column.key))"
        >
          <slot
            :name="column.key"
            :column="column"
          >
            {{ column.label }}
            <GTableSorter
              v-if="column.sortable"
              :col-key="column.key"
              :on-sort="column.onSort"
            />
          </slot>
        </th>
      </tr>
    </slot>
  </thead>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  inject,
} from 'vue';
import type {
  GTableColumn,
} from './types';
import {
  TABLE_KEY,
} from './types';
import GTableSorter from './GTableSorter.vue';

const {
  columns = [],
} = defineProps<{
  columns?: GTableColumn[];
}>();

const ctx = inject(TABLE_KEY, null);
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.g-table-sortable {
  cursor: pointer;
  user-select: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.g-table-sortable:hover {
  color: var(--gui-neutral-fg);
}
}
</style>
