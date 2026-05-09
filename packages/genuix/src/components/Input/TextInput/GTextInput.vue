<template>
  <input
    ref="inputRef"
    v-bind="$attrs"
    v-model="text"
    class="text-input"
    :class="[`text-input-${size}`]"
    :style="{
      '--_bg': tokens.bg,
      '--_bg-hover': tokens.bgHover,
      '--_fg': disabled ? tokens.mutedFg : tokens.fg,
      '--_border': tokens.border,
    }"
    :data-state="effectiveState"
    type="text"
    :name="name"
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="_readonly"
    :maxlength="maxLength"
    :minlength="minLength"
    :required="required"
  >
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  useTemplateRef,
} from 'vue';
import {
  GTextInputSize,
  GTextInputState,
  TEXT_INPUT_PATTERNS,
} from './types';
import type {
  TextInputPattern,
} from './types';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  GProminence,
  GSemantic,
} from '@/types';

defineOptions({
  inheritAttrs: false,
});

const text = defineModel<string>({
  default: '',
});

const {
  name = undefined,
  size = GTextInputSize.Md,
  state = GTextInputState.Default,
  disabled = false,
  readonly: _readonly = false,
  placeholder = 'Empty',
  required = false,
  pattern = undefined,
  minLength = undefined,
  maxLength = undefined,
} = defineProps<{
  /** The name of the input that will be sent in the HTML form */
  name?: string;
  /** The size of the text input: xs, sm, md, lg, xl */
  size?: GTextInputSize;
  /** The state of the text input: error, warning, success, default */
  state?: GTextInputState;
  /** Whether the input is disabled: Input is not editable and not included in the HTML form */
  disabled?: boolean;
  /** Whether the input is readonly: Input is not editable but still included in the HTML form */
  readonly?: boolean;
  /** Placeholder text of the input */
  placeholder?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Predefined input pattern to use */
  pattern?: TextInputPattern;
  /** The minimum length of input */
  minLength?: number;
  /** The maximum length of input */
  maxLength?: number;
}>();

const tokens = prominenceTokens(GProminence.Ghost, GSemantic.Neutral);

/* Input state */
const effectiveState = computed(() => {
  if (required && !text.value) return GTextInputState.Error;
  if (!text.value) return state;
  if (minLength !== undefined && text.value.length < minLength) return GTextInputState.Error;
  if (pattern && !TEXT_INPUT_PATTERNS[pattern].test(text.value)) return GTextInputState.Error;

  return state;
});

const inputRef = useTemplateRef('inputRef');

function blur () {
  inputRef.value?.blur();
}

function focus () {
  inputRef.value?.focus();
}

function select () {
  inputRef.value?.select();
}

defineExpose({
  focus,
  blur,
  select,
  isInvalid: computed(() => effectiveState.value === GTextInputState.Error),
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
  transition: border-color var(--duration-normal) var(--ease-default);
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
