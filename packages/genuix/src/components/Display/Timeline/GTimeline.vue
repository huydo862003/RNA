<template>
  <div
    v-bind="$attrs"
    class="timeline"
  >
    <slot />
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
.timeline {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: var(--spacing-xl);
}

.timeline::before {
  @apply left-1;
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gui-neutral-border-subtle);
}
}
</style>
