<template>
  <a
    v-if="href"
    v-bind="$attrs"
    :href="href"
    class="nav-brand"
  >
    <slot />
  </a>
  <span
    v-else
    v-bind="$attrs"
    class="nav-brand"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  href = undefined,
} = defineProps<{
  href?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.nav-brand {
  @apply inline-flex items-center gap-sm no-underline gui-neutral-fg font-bold text-sm shrink-0;
}

a.nav-brand:hover {
  @apply opacity-80 no-underline;
}
}
</style>
