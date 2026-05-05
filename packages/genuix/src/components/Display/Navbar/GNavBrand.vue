<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="nav-brand"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Component,
} from 'vue';

defineOptions({
  inheritAttrs: false,
});

const {
  as = 'a',
} = defineProps<{
  as?: string | Component;
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
