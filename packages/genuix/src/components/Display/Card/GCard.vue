<template>
  <div
    v-bind="$attrs"
    class="card"
  >
    <div
      v-if="$slots.icon"
      class="card-icon"
    >
      <slot name="icon" />
    </div>
    <div
      v-if="$slots.title"
      class="card-title"
    >
      <slot name="title" />
    </div>
    <div
      v-if="$slots.description"
      class="card-description"
    >
      <slot name="description" />
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
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
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border: 1px solid var(--gui-neutral-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.card-icon {
  display: flex;
}

.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--gui-neutral-fg);
}

.card-description {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--gui-neutral-fg-muted);
}

.card-footer {
  margin-top: auto;
}
}
</style>
