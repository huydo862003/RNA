<template>
  <span
    class="table-sort-indicator"
    @click.stop="onSort ? onSort(colKey) : context.handleSort(colKey)"
  >
    <GIcon
      v-if="direction === GSortDirection.Asc"
      :name="GIconName.ArrowUp"
      :size="10"
    />
    <GIcon
      v-else-if="direction === GSortDirection.Desc"
      :name="GIconName.ArrowDown"
      :size="10"
    />
    <GIcon
      v-else
      :name="GIconName.ArrowUpDown"
      :size="10"
      class="table-sort-indicator--inactive"
    />
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
} from 'vue';
import {
  GSortDirection,
  TABLE_KEY,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const {
  colKey,
  onSort = undefined,
} = defineProps<{
  colKey: string;
  onSort?: (key: string) => void;
}>();

const context = inject(TABLE_KEY)!;

const direction = computed(() => {
  if (context.sortKey.value !== colKey) return GSortDirection.None;
  return context.sortAsc.value ? GSortDirection.Asc : GSortDirection.Desc;
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.table-sort-indicator {
  display: inline-flex;
  margin-left: var(--spacing-xs);
  color: var(--gui-neutral-fg-muted);
}

.table-sort-indicator--inactive {
  opacity: 0.3;
}
}
</style>
