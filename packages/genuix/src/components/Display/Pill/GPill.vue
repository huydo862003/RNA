<template>
  <span
    :id="id"
    :class="[
      'pill',
      `pill-${size}`,
      _class,
    ]"
    :style="{
      '--_bg': tokens.bg,
      '--_fg': tokens.fg,
      '--_border': tokens.border,
      ..._style,
    }"
  >
    <span
      v-if="$slots.left"
      class="pill-slot-left pr-1"
    >
      <slot name="left" />
    </span>
    <span class="pill-label">
      <slot />
    </span>
    <span
      v-if="$slots.right"
      class="pill-slot-right pl-1"
    >
      <slot name="right" />
    </span>
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import {
  PillSize,
  PillColor,
  PILL_COLORS,
} from './types';
import {
  Prominence,
} from '@/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
  size = PillSize.Md,
  color = PillColor.Gray,
  prominence = Prominence.Secondary,
} = defineProps<{
  id?: string;
  class?: string;
  style?: Record<string, string>;
  size?: PillSize;
  color?: PillColor;
  prominence?: Prominence;
}>();

const tokens = computed(() => {
  const c = PILL_COLORS[color] ?? PILL_COLORS[PillColor.Gray];

  switch (prominence) {
  case Prominence.Primary:
    return {
      bg: c.solid,
      fg: '#ffffff',
      border: 'transparent',
    };
  case Prominence.Secondary:
    return {
      bg: c.bg,
      fg: c.fg,
      border: 'transparent',
    };
  case Prominence.Tertiary:
    return {
      bg: 'transparent',
      fg: c.fg,
      border: c.solid,
    };
  case Prominence.Ghost:
    return {
      bg: 'transparent',
      fg: c.fg,
      border: 'transparent',
    };
  default: {
    const _exhaustive: never = prominence;
    void _exhaustive;
    return {
      bg: 'transparent',
      fg: c.fg,
      border: 'transparent',
    };
  }
  }
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.pill {
  @apply inline-flex items-center gap-xs font-medium whitespace-nowrap select-none rounded-xl;
  background: var(--_bg);
  color: var(--_fg);
  border: 1px solid var(--_border);
}

/* Sizes */
.pill-xs {
  @apply text-xs px-xs py-0 h-5;
}

.pill-sm {
  @apply text-xs px-sm py-0 h-6;
}

.pill-md {
  @apply text-sm px-sm py-0 h-7;
}

.pill-lg {
  @apply text-md px-md py-xs h-8;
}

.pill-xl {
  @apply text-lg px-md py-xs h-9;
}

.pill-label {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}

.pill-slot-left,
.pill-slot-right {
  @apply inline-flex items-center;
}
}
</style>
