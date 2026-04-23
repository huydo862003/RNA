<template>
  <button
    :class="[
      'btn',
      `btn-${size}`,
      { 'is-loading': loading },
    ]"
    :style="{
      '--_bg': tokens.bg,
      '--_bg-hover': tokens.bgHover,
      '--_fg': tokens.fg,
      '--_border': tokens.border,
    }"
    :disabled="isInactive"
  >
    <GSpinner
      v-if="loading"
      :size="spinnerSize"
      class="btn-spinner"
    />
    <span class="btn-content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import GSpinner from '../Spinner/GSpinner.vue';
import {
  SpinnerSize,
} from '../Spinner/types';
import {
  ButtonProminence,
  ButtonSemantic,
  ButtonSize,
} from './types';
import {
  prominenceTokens,
} from '@/utils/prominence';

const {
  prominence = ButtonProminence.Primary,
  semantic = ButtonSemantic.Neutral,
  size = ButtonSize.Md,
  disabled = false,
  loading = false,
} = defineProps<{
  prominence?: ButtonProminence;
  semantic?: ButtonSemantic;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}>();

const tokens = computed(() => prominenceTokens(prominence, semantic));

const isInactive = computed(() => disabled || loading);

const spinnerSize = computed(() => {
  const map: Record<ButtonSize, SpinnerSize> = {
    [ButtonSize.Xs]: SpinnerSize.Xs,
    [ButtonSize.Sm]: SpinnerSize.Xs,
    [ButtonSize.Md]: SpinnerSize.Sm,
    [ButtonSize.Lg]: SpinnerSize.Md,
    [ButtonSize.Xl]: SpinnerSize.Md,
  };
  return map[size];
});
</script>

<style scoped>
@reference '../../style.css';

.btn {
  @apply inline-flex items-center justify-center font-mono cursor-pointer select-none relative;
  border-radius: var(--radius-md);
  transition-property: background-color, color, border-color;
  transition-duration: var(--duration-fast, 150ms);
  transition-timing-function: var(--ease-default, ease);
  background-color: var(--_bg);
  color: var(--_fg);
  border: 1px solid var(--_border);
}

.btn:hover:not(.btn:disabled) {
  background-color: var(--_bg-hover);
}

.btn:active:not(.btn:disabled) {
  animation: btn-pulse var(--duration-fast, 150ms) var(--ease-out, ease-out);
}

.btn:disabled {
  cursor: not-allowed;
  filter: brightness(0.95);
}

.btn.is-loading {
  cursor: wait;
  filter: brightness(0.85);
}

@keyframes btn-pulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
  100% { filter: brightness(1); }
}

/* Sizes */
.btn-xs {
  height: var(--size-3);
  padding-inline: var(--spacing-xs);
  font-size: var(--text-xs);
}

.btn-sm {
  height: var(--size-4);
  padding-inline: var(--spacing-sm);
  font-size: var(--text-xs);
}

.btn-md {
  height: var(--size-5);
  padding-inline: var(--spacing-md);
  font-size: var(--text-sm);
}

.btn-lg {
  height: var(--size-6);
  padding-inline: var(--spacing-lg);
  font-size: var(--text-base);
}

.btn-xl {
  height: var(--size-7);
  padding-inline: var(--spacing-xl);
  font-size: var(--text-lg);
}

/* Loading state: Spinner lays on top of the content */
.btn-spinner {
  position: absolute;
}

.btn-content {
  opacity: 1;
  transition: opacity var(--duration-fast) var(--ease-default);
}
</style>
