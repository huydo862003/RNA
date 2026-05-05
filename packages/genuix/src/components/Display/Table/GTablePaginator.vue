<template>
  <div
    v-if="ctx.maxPages.value > 1"
    class="g-table-pager"
  >
    <button
      :disabled="ctx.page.value <= 1"
      class="g-table-pager-btn"
      @click="ctx.setPage(ctx.page.value - 1)"
    >
      <GIcon
        :name="GIconName.ArrowLeft"
        :size="12"
      />
    </button>
    <span class="g-table-pager-info">{{ ctx.page.value }} / {{ ctx.maxPages.value }}</span>
    <button
      :disabled="ctx.page.value >= ctx.maxPages.value"
      class="g-table-pager-btn"
      @click="ctx.setPage(ctx.page.value + 1)"
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

const ctx = inject(TABLE_KEY)!;
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.g-table-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.g-table-pager-btn {
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

.g-table-pager-btn:hover:not(:disabled) {
  border-color: var(--gui-neutral-border-strong);
}

.g-table-pager-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.g-table-pager-info {
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
}
}
</style>
