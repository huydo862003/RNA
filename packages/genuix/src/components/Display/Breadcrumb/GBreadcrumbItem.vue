<template>
  <li
    v-if="!isInEllipsis"
    class="breadcrumb-item"
    :class="{ 'is-last': isLast }"
    :style="{ order: order * 2 }"
  >
    <span
      v-if="order > 0"
      class="breadcrumb-sep"
      aria-hidden="true"
    >
      <GIcon
        v-if="isIconSeparator"
        :name="ctx.separator as GIconName"
      />
      <template v-else>{{ ctx.separator }}</template>
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

defineProps<{
  as?: Component | string;
}>();

const ctx = inject(BREADCRUMB_KEY)!;
const id = Symbol();

const isLast = computed(() => id === ctx.items.value[ctx.items.value.length - 1]);
const isInEllipsis = computed(() => ctx.collapsedSet.value.has(id));
const order = computed(() => ctx.items.value.indexOf(id));

const ICON_VALUES = new Set<string>(Object.values(GIconName));
const isIconSeparator = computed(() => ICON_VALUES.has(ctx.separator));

onMounted(() => ctx.register(id));
onUnmounted(() => ctx.unregister(id));
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
