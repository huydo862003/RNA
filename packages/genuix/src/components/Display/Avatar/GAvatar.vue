<template>
  <GTooltip
    v-if="label"
    placement="bottom"
    :show-delay="300"
  >
    <span
      v-bind="$attrs"
      :id="id"
      :class="[
        'avatar',
        `avatar-${size}`,
        `avatar-${shape}`,
      ]"
      role="img"
      :aria-label="label"
    >
      <slot />
    </span>
    <template #popper>
      {{ label }}
    </template>
  </GTooltip>
  <span
    v-else
    v-bind="$attrs"
    :id="id"
    :class="[
      'avatar',
      `avatar-${size}`,
      `avatar-${shape}`,
    ]"
    role="img"
    aria-label=""
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  AvatarShape,
} from './types';
import type {
  AvatarSize,
} from './types';
import {
  Size,
} from '@/types';
import GTooltip from '@/components/Overlay/Tooltip/GTooltip.vue';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  size = Size.Md,
  shape = AvatarShape.Circle,
  label = undefined,
} = defineProps<{
  id?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Accessible name, also shown as tooltip on hover */
  label?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.avatar {
  @apply inline-flex items-center justify-center shrink-0 overflow-hidden select-none font-medium;
}

.avatar-circle {
  @apply rounded-full;
}

.avatar-square {
  @apply rounded-md;
}

/* Sizes */
.avatar-xs {
  width: var(--size-3);
  height: var(--size-3);
  @apply text-xs;
}

.avatar-sm {
  width: var(--size-4);
  height: var(--size-4);
  @apply text-xs;
}

.avatar-md {
  width: var(--size-5);
  height: var(--size-5);
  @apply text-sm;
}

.avatar-lg {
  width: var(--size-6);
  height: var(--size-6);
  @apply text-md;
}

.avatar-xl {
  width: var(--size-7);
  height: var(--size-7);
  @apply text-lg;
}
}
</style>
