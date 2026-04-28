<template>
  <textarea
    :id="id"
    ref="textareaRef"
    v-bind="$attrs"
    v-model="text"
    :class="[
      'textarea',
      `textarea-${size}`,
      `textarea-resize-${resize}`,
    ]"
    :style="{
      '--_bg': tokens.bg,
      '--_bg-hover': tokens.bgHover,
      '--_fg': disabled ? tokens.mutedFg : tokens.fg,
      '--_border': tokens.border,
    }"
    :data-state="state"
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="_readonly"
    :rows="rows"
  />
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref,
} from 'vue';
import {
  TextAreaSize,
  TextAreaState,
  TextAreaResize,
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
  size = TextAreaSize.Md,
  state = TextAreaState.Default,
  disabled = false,
  readonly: _readonly = false,
  placeholder = '',
  rows = 3,
  resize = TextAreaResize.Y,
} = defineProps<{
  id?: string;
  size?: TextAreaSize;
  state?: TextAreaState;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  rows?: number;
  /** Resize direction: 'both', 'x', 'y' (default), 'none' */
  resize?: TextAreaResize;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function focus () {
  textareaRef.value?.focus();
}

function blur () {
  textareaRef.value?.blur();
}

defineExpose({
  focus,
  blur,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.textarea {
  @apply inline-block rounded-md border border-solid outline-none font-mono w-full;
  background: var(--_bg);
  color: var(--_fg);
  border-color: var(--_border);
  transition: border-color var(--duration-fast) var(--ease-default);
}

.textarea:focus {
  @apply gui-info-border;
}

.textarea:disabled {
  @apply cursor-not-allowed gui-neutral-bg-subtle opacity-50 resize-none;
}

.textarea::placeholder {
  @apply gui-neutral-fg-muted opacity-50;
  font-size: var(--_placeholder-size);
}

/* States */
.textarea[data-state="error"] {
  @apply gui-danger-border;
  }
.textarea[data-state="error"]:focus {
  @apply gui-danger-border;
}
.textarea[data-state="warning"] {
  @apply gui-warning-border;
}
.textarea[data-state="warning"]:focus {
  @apply gui-warning-border;
}
.textarea[data-state="success"] {
  @apply gui-success-border;
}
.textarea[data-state="success"]:focus {
  @apply gui-success-border;
}

/* Sizes */
.textarea-xs {
  @apply text-xs p-xs;
  --_placeholder-size: var(--text-xs);
}
.textarea-sm {
  @apply text-sm p-sm;
  --_placeholder-size: var(--text-xs);
}
.textarea-md {
  @apply text-md p-sm;
  --_placeholder-size: var(--text-sm);
}
.textarea-lg {
  @apply text-lg p-md;
  --_placeholder-size: var(--text-md);
}
.textarea-xl {
  @apply text-xl p-md;
  --_placeholder-size: var(--text-lg);
}

/* Resize */
.textarea-resize-both {
  resize: both;
}
.textarea-resize-x {
  resize: horizontal;
}
.textarea-resize-y {
  resize: vertical;
}
.textarea-resize-none {
  resize: none;
}
}
</style>
