<template>
  <button
    v-bind="$attrs"
    class="nav-button"
    type="button"
    role="menuitem"
  >
    <slot />
  </button>
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
.nav-button {
  @apply inline-flex items-center justify-center cursor-pointer bg-transparent border-none gui-neutral-fg-muted p-xs rounded-sm;
  transition: color var(--duration-fast) var(--ease-default);
}

.nav-button:hover {
  @apply gui-neutral-fg;
}
}
</style>
