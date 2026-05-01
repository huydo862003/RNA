<template>
  <component
    :is="as"
    v-bind="$attrs"
    :href="href"
    :to="to"
    :class="['nav-link', active && 'nav-link--active']"
    role="menuitem"
  >
    <GIcon
      v-if="icon"
      :name="icon"
      class="nav-link-icon"
    />
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Component,
} from 'vue';
import type {
  GIconName,
} from '@/components/Display/Icon/types';
import GIcon from '@/components/Display/Icon/GIcon.vue';

defineOptions({
  inheritAttrs: false,
});

const {
  as = 'a',
  href = undefined,
  to = undefined,
  label = undefined,
  icon = undefined,
  active = false,
} = defineProps<{
  as?: string | Component;
  href?: string;
  to?: string | Record<string, unknown>;
  label?: string;
  icon?: GIconName;
  active?: boolean;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.nav-link {
  @apply inline-flex items-center gap-xs text-xs no-underline gui-neutral-fg-muted px-sm py-xs rounded-sm;
  transition: color var(--duration-fast) var(--ease-default), background var(--duration-fast) var(--ease-default);
}

.nav-link:hover {
  @apply gui-neutral-fg gui-neutral-bg-hover no-underline;
}

.nav-link--active {
  @apply gui-primary-fg;
}

.nav-link-icon {
  @apply shrink-0;
}
}
</style>
