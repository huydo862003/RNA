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
    :data-state="effectiveState"
    :name="name"
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="_readonly"
    :rows="rows"
    :maxlength="maxLength"
    :minlength="minLength"
    :required="required"
  />
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  ref,
} from 'vue';
import {
  TextAreaSize,
  TextAreaState,
  TextAreaResize,
} from './types';
import {
  TEXT_INPUT_PATTERNS,
} from '@/components/Input/TextInput/types';
import type {
  TextInputPattern,
} from '@/components/Input/TextInput/types';
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
  name = undefined,
  size = TextAreaSize.Md,
  state = TextAreaState.Default,
  disabled = false,
  readonly: _readonly = false,
  placeholder = '',
  rows = 3,
  resize = TextAreaResize.Y,
  required = false,
  pattern = undefined,
  minLength = undefined,
  maxLength = undefined,
} = defineProps<{
  id?: string;
  name?: string;
  size?: TextAreaSize;
  state?: TextAreaState;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  rows?: number;
  resize?: TextAreaResize;
  required?: boolean;
  pattern?: TextInputPattern;
  minLength?: number;
  maxLength?: number;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

/* Input state */
const effectiveState = computed(() => {
  if (required && !text.value) return TextAreaState.Error;
  if (!text.value) return state;
  if (minLength !== undefined && text.value.length < minLength) return TextAreaState.Error;
  if (pattern && !TEXT_INPUT_PATTERNS[pattern].test(text.value)) return TextAreaState.Error;
  return state;
});

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
  isInvalid: computed(() => effectiveState.value === TextAreaState.Error),
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
  transition: border-color var(--duration-normal) var(--ease-default);
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
