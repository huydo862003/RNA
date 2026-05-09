<template>
  <div
    v-bind="$attrs"
    class="timeline-item"
  >
    <div class="timeline-dot">
      <slot name="dot" />
    </div>
    <div class="timeline-content">
      <div
        v-if="$slots.title || title"
        class="timeline-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="$slots.meta || meta"
        class="timeline-meta"
      >
        <slot name="meta">
          {{ meta }}
        </slot>
      </div>
      <div
        v-if="$slots.default"
        class="timeline-body"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  title = '',
  meta = '',
} = defineProps<{
  /** Title text for this timeline entry */
  title?: string;
  /** Secondary metadata text (e.g. date or author) */
  meta?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.timeline-item {
  position: relative;
  padding-bottom: var(--spacing-lg);
}

.timeline-dot {
  position: absolute;
  left: calc(-1 * var(--spacing-xl));
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--gui-primary-solid);
  border: 2px solid var(--gui-neutral-bg);
}

.timeline-title {
  font-weight: var(--font-weight-medium);
  color: var(--gui-neutral-fg);
  font-size: var(--text-sm);
}

.timeline-meta {
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
  margin-top: var(--spacing-2xs);
}

.timeline-body {
  margin-top: var(--spacing-sm);
  font-size: var(--text-sm);
  color: var(--gui-neutral-fg-muted);
}
}
</style>
