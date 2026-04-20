<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
    ]"
    :style="{
      '--_bg': `var(--gui-${semantic}-bg)`,
      '--_bg-hover': `var(--gui-${semantic}-bg-hover)`,
      '--_bg-active': `var(--gui-${semantic}-bg-active)`,
      '--_border': `var(--gui-${semantic}-border)`,
      '--_solid': `var(--gui-${semantic}-solid)`,
      '--_solid-hover': `var(--gui-${semantic}-solid-hover)`,
      '--_fg': `var(--gui-${semantic}-fg)`,
      '--_fg-muted': `var(--gui-${semantic}-fg-muted)`,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ButtonVariant,
  ButtonSemantic,
  ButtonSize,
} from './types';

const {
  variant = ButtonVariant.Solid,
  semantic = ButtonSemantic.Primary,
  size = ButtonSize.Md,
  disabled = false,
} = defineProps<{
  variant?: ButtonVariant;
  semantic?: ButtonSemantic;
  size?: ButtonSize;
  disabled?: boolean;
}>();
</script>

<style scoped>
@reference '../../style.css';

/* Base */
.btn {
  @apply inline-flex items-center justify-center font-mono cursor-pointer select-none;
  border: none;
  border-radius: var(--radius-md);
  transition-property: background-color, color, border-color;
  transition-duration: var(--duration-fast, 150ms);
  transition-timing-function: var(--ease-default, ease);
}

.btn:active {
  animation: btn-pulse var(--duration-fast, 150ms) var(--ease-out, ease-out);
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
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

/* Variants */
.btn-solid {
  background-color: var(--_solid);
  color: white;
}

.btn-solid:hover {
  background-color: var(--_solid-hover);
}

.btn-soft {
  background-color: var(--_bg-hover);
  color: var(--_fg);
}

.btn-soft:hover {
  background-color: var(--_bg-active);
}

.btn-outline {
  background-color: transparent;
  color: var(--_fg);
  border: 1px solid var(--_border);
}

.btn-outline:hover {
  background-color: var(--_bg-hover);
}

.btn-ghost {
  background-color: transparent;
  color: var(--_fg);
}

.btn-ghost:hover {
  background-color: var(--_bg-hover);
}

.btn-link {
  background-color: transparent;
  color: var(--_fg);
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
