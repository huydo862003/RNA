<template>
  <div
    v-if="context.maxPages.value > 1"
    class="table-pager"
  >
    <button
      type="button"
      :disabled="context.page.value <= 1"
      class="table-pager-btn"
      @click="goToPreviousPage"
    >
      <GIcon
        :name="GIconName.ArrowLeft"
        :size="12"
      />
    </button>
    <span class="table-pager-info">{{ context.page.value }} / {{ context.maxPages.value }}</span>
    <button
      type="button"
      :disabled="context.page.value >= context.maxPages.value"
      class="table-pager-btn"
      @click="goToNextPage"
    >
      <GIcon
        :name="GIconName.ArrowRight"
        :size="12"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  inject,
} from 'vue';
import {
  TABLE_KEY,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const context = inject(TABLE_KEY)!;

function goToNextPage () {
  context.setPage(context.page.value + 1);
}

function goToPreviousPage () {
  context.setPage(context.page.value - 1);
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.table-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.table-pager-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--gui-neutral-border);
  border-radius: var(--radius-sm);
  color: var(--gui-neutral-fg-muted);
  cursor: pointer;
  background: transparent;
  transition: border-color var(--duration-fast) var(--ease-default);
}

.table-pager-btn:hover:not(:disabled) {
  border-color: var(--gui-neutral-border-strong);
}

.table-pager-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.table-pager-info {
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
}
}
</style>
