<template>
  <div
    v-bind="$attrs"
    class="divider"
    :class="[`divider--${orientation}`]"
    role="separator"
  >
    <span
      v-if="$slots.default"
      class="divider-label"
    >
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  GDividerOrientation,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  orientation = GDividerOrientation.Horizontal,
} = defineProps<{
  /** Orientation of the divider line */
  orientation?: GDividerOrientation;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.divider--horizontal {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--spacing-sm);
}

.divider--horizontal::before,
.divider--horizontal::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--gui-neutral-border-subtle);
}

.divider--horizontal:not(:has(.divider-label))::after {
  display: none;
}

.divider--vertical {
  display: inline-flex;
  align-self: stretch;
  width: 1px;
  background: var(--gui-neutral-border-subtle);
}

.divider-label {
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
  white-space: nowrap;
}
}
</style>
