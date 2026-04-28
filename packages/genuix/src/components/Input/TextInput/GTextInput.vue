<template>
  <input
    :id="id"
    ref="inputRef"
    v-bind="$attrs"
    v-model="text"
    :class="[
      'text-input',
      `text-input-${size}`,
    ]"
    :style="{
      '--_bg': tokens.bg,
      '--_bg-hover': tokens.bgHover,
      '--_fg': disabled ? tokens.mutedFg : tokens.fg,
      '--_border': tokens.border,
    }"
    :data-state="state"
    type="text"
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="_readonly"
  >
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref,
} from 'vue';
import {
  TextInputSize,
  TextInputState,
} from './types';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  Prominence,
  Semantic,
} from '@/types';

defineOptions({
  inheritAttrs: false,
});

const text = defineModel<string>({
  default: '',
});

const {
  id = undefined,
  size = TextInputSize.Md,
  state = TextInputState.Default,
  disabled = false,
  readonly: _readonly = false,
  placeholder = 'Empty',
} = defineProps<{
  id?: string;
  size?: TextInputSize;
  state?: TextInputState;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

const inputRef = ref<HTMLInputElement | null>(null);

function focus () {
  inputRef.value?.focus();
}

function blur () {
  inputRef.value?.blur();
}

function select () {
  inputRef.value?.select();
}

defineExpose({
  focus,
  blur,
  select,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.text-input {
  @apply inline-flex items-center rounded-md border border-solid outline-none font-mono;
  background: var(--_bg);
  color: var(--_fg);
  border-color: var(--_border);
  transition: border-color var(--duration-fast) var(--ease-default);
}

.text-input:focus {
  @apply gui-info-border;
}

.text-input:disabled {
  @apply cursor-not-allowed gui-neutral-bg-subtle opacity-50;
}

.text-input::placeholder {
  @apply gui-neutral-fg-muted opacity-50;
  font-size: var(--_placeholder-size);
}

/* States */
.text-input[data-state="error"] {
  @apply gui-danger-border;
}

.text-input[data-state="error"]:focus {
  @apply gui-danger-border;
}

.text-input[data-state="warning"] {
  @apply gui-warning-border;
}

.text-input[data-state="warning"]:focus {
  @apply gui-warning-border;
}

.text-input[data-state="success"] {
  @apply gui-success-border;
}

.text-input[data-state="success"]:focus {
  @apply gui-success-border;
}

/* Sizes */
.text-input-xs {
  @apply h-6 text-xs p-xs pl-sm;
  --_placeholder-size: var(--text-xs);
}

.text-input-sm {
  @apply h-7 text-sm p-sm pl-sm;
  --_placeholder-size: var(--text-xs);
}

.text-input-md {
  @apply h-8 text-md p-md pl-sm;
  --_placeholder-size: var(--text-sm);
}

.text-input-lg {
  @apply h-9 text-lg p-md pl-sm;
  --_placeholder-size: var(--text-md);
}

.text-input-xl {
  @apply h-10 text-xl p-lg pl-sm;
  --_placeholder-size: var(--text-lg);
}
}
</style>
