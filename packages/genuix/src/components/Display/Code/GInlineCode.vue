<template>
  <code
    :id="id"
    :class="['inline-code', _class]"
    :style="_style"
  >
    <slot />
  </code>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
} = defineProps<{
  id?: string;
  class?: string;
  style?: Record<string, string>;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.inline-code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-sm);
  background-color: var(--gui-neutral-bg-hover);
  border: 1px solid var(--gui-neutral-border-subtle);
  color: var(--gui-neutral-fg);
}
}
</style>
