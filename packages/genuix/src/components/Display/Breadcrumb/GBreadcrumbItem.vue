<template>
  <li
    v-if="!isInEllipsis"
    class="breadcrumb-item"
    :class="{
      'is-last': isLast,
    }"
    :style="{
      order: order * 2,
    }"
  >
    <span
      v-if="order > 0"
      class="breadcrumb-sep"
      aria-hidden="true"
    >
      <GIcon
        v-if="isIconSeparator"
        :name="context.separator as GIconName"
      />
      <template v-else>{{ context.separator }}</template>
    </span>
    <component
      :is="isLast ? 'span' : (as ?? 'span')"
      v-bind="isLast ? {} : $attrs"
      :class="isLast ? 'breadcrumb-current' : 'breadcrumb-link'"
      :aria-current="isLast ? 'page' : undefined"
    >
      <slot />
    </component>
  </li>
</template>

<script setup lang="ts">
import {
  computed, inject, onMounted, onUnmounted,
} from 'vue';
import type {
  Component,
} from 'vue';
import {
  BREADCRUMB_KEY,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  as = undefined,
} = defineProps<{
  /** Element or component to render as */
  as?: Component | string;
}>();

const context = inject(BREADCRUMB_KEY)!;
const id = Symbol();

const isLast = computed(() => id === context.items.value[context.items.value.length - 1]);
const isInEllipsis = computed(() => context.collapsedSet.value.has(id));
const order = computed(() => context.items.value.indexOf(id));

const ICON_VALUES = new Set<string>(Object.values(GIconName));
const isIconSeparator = computed(() => ICON_VALUES.has(context.separator));

onMounted(() => context.register(id));
onUnmounted(() => context.unregister(id));
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.breadcrumb-item {
  @apply inline-flex items-center;
}

.breadcrumb-sep {
  @apply mx-1 gui-neutral-fg-muted opacity-50 inline-flex items-center;
}

.breadcrumb-link {
  @apply no-underline gui-neutral-fg-muted inline-flex items-center gap-xs max-w-48;
  transition: color var(--duration-fast) var(--ease-default);
}

.breadcrumb-link:hover {
  @apply gui-primary-fg no-underline;
}

.breadcrumb-current {
  @apply gui-neutral-fg font-medium inline-flex items-center gap-xs max-w-48;
}
}
</style>
