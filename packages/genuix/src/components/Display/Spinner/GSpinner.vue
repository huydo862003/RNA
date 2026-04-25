<template>
  <!-- Idea: A static soft ring with a nearly full solid arc rotating -->

  <!-- Viewbox use 24 - A popular icon grid -->
  <!-- r is set to 10 to account for the stroke-width of 3 -->
  <svg
    :id="id"
    :class="['spinner', `spinner-${size}`, `spinner-${speed}`, _class]"
    :style="_style"
    viewBox="0 0 24 24"
    fill="none"
    role="status"
    :aria-label="label"
  >
    <!-- Full circle background ring -->
    <circle
      class="spinner-track"
      cx="12"
      cy="12"
      r="10"
      stroke-width="3"
    />
    <!-- Stroke line cap makes the arc soft on the ends -->
    <circle
      class="spinner-arc"
      cx="12"
      cy="12"
      r="10"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  SpinnerSize,
  SpinnerSpeed,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
  size = SpinnerSize.Md,
  speed = SpinnerSpeed.Normal,
  label = 'Loading',
} = defineProps<{
  id?: string;
  class?: string;
  style?: Record<string, string>;
  size?: SpinnerSize;
  speed?: SpinnerSpeed;
  label?: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.spinner-slow {
  animation: spin 1.5s linear infinite;
}

.spinner-normal {
  animation: spin 0.8s linear infinite;
}

.spinner-fast {
  animation: spin 0.4s linear infinite;
}

/* Sizes map to --size-* tokens */
.spinner-xs {
  width: var(--size-2);
  height: var(--size-2);
}

.spinner-sm {
  width: var(--size-3);
  height: var(--size-3);
}

.spinner-md {
  width: var(--size-4);
  height: var(--size-4);
}

.spinner-lg {
  width: var(--size-5);
  height: var(--size-5);
}

.spinner-xl {
  width: var(--size-6);
  height: var(--size-6);
}

.spinner-track {
  @apply opacity-60;
  stroke: var(--gui-neutral-border-subtle); /* subtle static background (soft neutral) */
}

.spinner-arc {
  @apply stroke-current;
  stroke-dasharray: 45 100; /* Draw 45 units then gap 100 units (unit here assumes the unit in the view box - 45 units are well over 70% of 20pi, the circumference)*/
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
}
</style>
