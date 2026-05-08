<template>
  <thead>
    <slot>
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          :class="[column.class, { 'table-sortable': column.sortable }]"
          @click="column.sortable && (column.onSort ? column.onSort(column.key) : context?.handleSort(column.key))"
        >
          <slot
            :name="column.key"
            :column="column"
          >
            <span class="table-th-content">
              <span>{{ column.label }}</span>
              <GTableSorter
                v-if="column.sortable"
                :col-key="column.key"
                :on-sort="column.onSort"
              />
            </span>
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

const context = inject(TABLE_KEY, null);
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.table-sortable {
  cursor: pointer;
  user-select: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.table-sortable:hover {
  color: var(--gui-neutral-fg);
}

.table-th-content {
  display: flex;
  align-items: first baseline;
  gap: var(--spacing-xs);
}

.table-th-content > span:first-child {
  flex: 1;
}
}
</style>
