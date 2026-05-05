<template>
  <th
    v-if="header"
    v-bind="$attrs"
  >
    <slot />
  </th>
  <td
    v-else
    v-bind="$attrs"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  header = false,
} = defineProps<{
  header?: boolean;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
th {
  text-align: left;
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  color: var(--gui-neutral-fg-muted);
  padding-bottom: var(--spacing-sm);
  padding-right: var(--spacing-md);
  border-bottom: 1px solid var(--gui-neutral-border);
}

td {
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 0;
}
}
</style>
