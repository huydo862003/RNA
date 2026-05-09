<template>
  <nav
    v-bind="$attrs"
    class="toc"
  >
    <div
      v-if="label"
      class="toc-label"
    >
      {{ label }}
    </div>
    <ul class="toc-list">
      <slot />
    </ul>
  </nav>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  label = '',
} = defineProps<{
  /** Display label for the table of contents heading */
  label?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.toc {
  font-size: var(--text-sm);
}

.toc-label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--gui-neutral-fg-muted);
  margin-bottom: var(--spacing-sm);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
}
</style>
