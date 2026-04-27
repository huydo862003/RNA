<template>
  <a
    v-if="href"
    v-bind="$attrs"
    :id="id"
    :href="href"
    target="_blank"
    rel="noopener"
    :class="[
      'badge',
      `badge-${badgeStyle}`,
      `badge-${size}`,
    ]"
  >
    <span
      class="badge-label"
      :style="{ background: labelBg }"
    >{{ label }}</span>
    <span
      v-if="value"
      class="badge-value"
      :style="{ background: valueBg, color: valueFg }"
    >{{ value }}</span>
  </a>
  <span
    v-else
    v-bind="$attrs"
    :id="id"
    :class="[
      'badge',
      `badge-${badgeStyle}`,
      `badge-${size}`,
    ]"
  >
    <span
      class="badge-label"
      :style="{ background: labelBg }"
    >{{ label }}</span>
    <span
      v-if="value"
      class="badge-value"
      :style="{ background: valueBg, color: valueFg }"
    >{{ value }}</span>
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import {
  BadgeStyle,
} from './types';
import type {
  BadgeColor,
  BadgeSize,
} from './types';
import {
  Size,
} from '@/types';
import {
  PillColor,
  PILL_COLORS,
} from '@/components/Display/Pill/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  size = Size.Sm,
  badgeStyle = BadgeStyle.Flat,
  label,
  value = undefined,
  color = PillColor.Blue,
  href = undefined,
} = defineProps<{
  id?: string;
  size?: BadgeSize;
  badgeStyle?: BadgeStyle;
  /** Left side text (like "license", "version", "build") */
  label: string;
  /** Right side text (like "MIT", "v1.2.0", "passing") */
  value?: string;
  /** Color of the value section */
  color?: BadgeColor;
  /** Optional link URL */
  href?: string;
}>();

const labelBg = '#555';

const valueBg = computed(() => {
  return PILL_COLORS[color]?.solid ?? PILL_COLORS[PillColor.Blue].solid;
});

const valueFg = '#fff';
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.badge {
  @apply inline-flex items-stretch font-mono select-none no-underline;
  line-height: 1;
}

.badge-flat {
  @apply rounded-md;
}

.badge-flat-square {
  @apply rounded-none;
}

.badge-label,
.badge-value {
  @apply inline-flex items-center;
  color: #fff;
}

.badge-label {
  @apply rounded-l-md;
}

.badge-value {
  @apply rounded-r-md;
}

.badge-flat-square .badge-label {
  @apply rounded-l-none;
}

.badge-flat-square .badge-value {
  @apply rounded-r-none;
}

/* Only label */
.badge-label:last-child {
  @apply rounded-r-md;
}

.badge-flat-square .badge-label:last-child {
  @apply rounded-r-none;
}

/* Sizes */
.badge-xs .badge-label,
.badge-xs .badge-value {
  @apply text-xs px-1 py-0;
  font-size: 9px;
}

.badge-sm .badge-label,
.badge-sm .badge-value {
  @apply px-1.5 py-0.5;
  font-size: 10px;
}

.badge-md .badge-label,
.badge-md .badge-value {
  @apply px-2 py-1;
  font-size: 11px;
}

.badge-lg .badge-label,
.badge-lg .badge-value {
  @apply px-2.5 py-1;
  font-size: 12px;
}

.badge-xl .badge-label,
.badge-xl .badge-value {
  @apply px-3 py-1.5;
  font-size: 14px;
}

a.badge:hover {
  @apply opacity-80;
}
}
</style>
