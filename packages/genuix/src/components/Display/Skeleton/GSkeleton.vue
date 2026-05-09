<template>
  <div
    v-bind="$attrs"
    class="skeleton"
    :style="{
      width,
      height,
    }"
  />
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  width = undefined,
  height = undefined,
} = defineProps<{
  /** CSS width of the skeleton */
  width?: string;
  /** CSS height of the skeleton */
  height?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.skeleton {
  background: var(--gui-neutral-bg-hover);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  height: 1em;
  width: 100%;
  border-radius: var(--radius-sm);
}
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
}
</style>
