<template>
  <a
    v-if="href"
    v-bind="$attrs"
    :id="id"
    :href="href"
    :class="[
      'logo',
      `logo-${size}`,
    ]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="logo-img"
    >
    <slot v-else />
    <span
      v-if="$slots.text || text"
      class="logo-text"
    >
      <slot name="text">{{ text }}</slot>
    </span>
  </a>
  <span
    v-else
    v-bind="$attrs"
    :id="id"
    :class="[
      'logo',
      `logo-${size}`,
    ]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="logo-img"
    >
    <slot v-else />
    <span
      v-if="$slots.text || text"
      class="logo-text"
    >
      <slot name="text">{{ text }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  LogoSize,
} from './types';
import {
  Size,
} from '@/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  size = Size.Md,
  src = undefined,
  alt = '',
  text = undefined,
  href = undefined,
} = defineProps<{
  id?: string;
  size?: LogoSize;
  /** Brand image URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Brand name text next to image */
  text?: string;
  /** Optional link URL */
  href?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.logo {
  @apply inline-flex items-center gap-sm no-underline;
}

a.logo:hover {
  @apply opacity-80;
}

.logo-img {
  @apply h-full w-auto object-contain;
}

/* Sizes */
.logo-xs {
  height: var(--size-5);
  @apply text-sm;
}

.logo-sm {
  height: var(--size-6);
  @apply text-md;
}

.logo-md {
  height: var(--size-7);
  @apply text-lg;
}

.logo-lg {
  height: var(--size-8);
  @apply text-xl;
}

.logo-xl {
  height: 5rem;
  @apply text-2xl;
}

.logo-text {
  @apply font-bold gui-neutral-fg whitespace-nowrap;
  font-size: inherit;
}
}
</style>
