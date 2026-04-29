<template>
  <nav
    v-bind="$attrs"
    class="navbar"
    aria-label="Main"
  >
    <div class="navbar-inner">
      <div class="navbar-left">
        <slot name="left" />
      </div>
      <!-- Desktop -->
      <div class="navbar-right">
        <slot name="right" />
      </div>
      <!-- Mobile hamburger -->
      <button
        class="navbar-hamburger"
        type="button"
        :aria-expanded="!collapsed"
        :aria-label="collapsed ? 'Open menu' : 'Close menu'"
        @click="toggle"
      >
        <GIcon :name="GIconName.Menu" />
      </button>
    </div>
    <!-- Mobile menu below nav -->
    <div
      v-if="!collapsed"
      class="navbar-menu"
      role="menu"
    >
      <slot name="menu">
        <slot name="right" />
      </slot>
    </div>
  </nav>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  provide,
  readonly,
  ref,
} from 'vue';
import {
  NAVBAR_KEY,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const collapsed = ref(true);

function toggle () {
  collapsed.value = !collapsed.value;
}

provide(NAVBAR_KEY, {
  collapsed: readonly(collapsed),
  toggle,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.navbar {
  @apply border-b gui-neutral-border-subtle gui-neutral-bg;
}

.navbar-inner {
  @apply flex items-center px-md;
  height: 3rem;
}

.navbar-left {
  @apply flex items-center gap-md;
}

.navbar-right {
  @apply hidden sm:flex items-center gap-md ml-auto;
}

.navbar-hamburger {
  @apply hidden max-sm:inline-flex ml-auto items-center justify-center cursor-pointer bg-transparent border-none gui-neutral-fg-muted p-xs;
}

.navbar-hamburger:hover {
  @apply gui-neutral-fg;
}

.navbar-menu {
  @apply sm:hidden border-t gui-neutral-border-subtle px-md py-sm flex flex-col gap-xs items-stretch;
}
}
</style>
