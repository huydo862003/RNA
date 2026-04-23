<template>
  <code class="inline-code">
    <slot />
  </code>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */
</script>

<style scoped>
@reference '@/style.css';

.inline-code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-sm);
  background-color: var(--gui-neutral-bg-hover);
  border: 1px solid var(--gui-neutral-border-subtle);
  color: var(--gui-neutral-fg);
}
</style>
