<template>
  <div
    v-bind="$attrs"
    :id="id"
    :class="[
      'number-input',
      `number-input-${size}`,
    ]"
    :style="{
      '--_bg': tokens.bg,
      '--_bg-hover': tokens.bgHover,
      '--_fg': disabled ? tokens.mutedFg : tokens.fg,
      '--_border': tokens.border,
    }"
    :data-state="effectiveState"
    @click="inputRef?.focus()"
  >
    <input
      ref="inputRef"
      v-model="rawInput"
      class="number-input-field"
      type="text"
      inputmode="numeric"
      :disabled="disabled"
      :size="inputSize"
      :placeholder="placeholder"
      :required="required"
    >
    <div
      v-if="!noStepper"
      class="number-input-steppers"
    >
      <button
        class="number-input-stepper"
        type="button"
        :disabled="disabled || (value !== undefined && max !== undefined && value >= max)"
        tabindex="-1"
        @click="increment"
      >
        <GIcon
          :name="GIconName.ChevronUp"
          class="number-input-stepper-icon"
        />
      </button>
      <button
        class="number-input-stepper"
        type="button"
        :disabled="disabled || (value !== undefined && min !== undefined && value <= min)"
        tabindex="-1"
        @click="decrement"
      >
        <GIcon
          :name="GIconName.ChevronDown"
          class="number-input-stepper-icon"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  ref,
  watch,
} from 'vue';
import {
  NumberInputSize,
  NumberInputState,
} from './types';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  Prominence,
  Semantic,
} from '@/types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const INTEGER_REGEX = /^-?[0-9]*$/;
const NUMBER_REGEX = /^-?[0-9]*(\.[0-9]*)?$/;
// Allows partially typed numbers like "-", "3.", "-." so the user can keep typing
const PARTIAL_NUMBER_REGEX = /^(-?[0-9]*\.?|-?[0-9]*\.[0-9]*)$/;

defineOptions({
  inheritAttrs: false,
});

const value = defineModel<number | undefined>({
  default: undefined,
});

const {
  id = undefined,
  size = NumberInputSize.Md,
  state = NumberInputState.Default,
  disabled = false,
  placeholder = '',
  min = undefined,
  max = undefined,
  required = false,
  integer = false,
  noStepper = false,
  step = 1,
} = defineProps<{
  id?: string;
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  /** Only allow integers (no decimal point) */
  integer?: boolean;
  /** Hide stepper buttons */
  noStepper?: boolean;
  min?: number;
  max?: number;
  step?: number;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

/* Input state */
const effectiveState = computed(() => {
  if (value.value === undefined && required) return NumberInputState.Error;
  const numberRegex = integer ? INTEGER_REGEX : NUMBER_REGEX;
  if (rawInput.value !== '' && !numberRegex.test(rawInput.value)) return NumberInputState.Error;
  if (value.value === undefined) return state;
  if (max !== undefined && max < value.value) return NumberInputState.Error;
  if (min !== undefined && value.value < min) return NumberInputState.Error;
  return state;
});

/* Number input handling */
const rawInput = ref(''); // Raw input that syncs with the `value` model
// FIXME: this causes a circular watch with rawInput, but it's currently fine as the circle ends because the watched values are set to the same value
watch(value, (newValue) => {
  // Do not set rawInput.value if it already equals to newValue
  // Reasons:
  //  1. For performance
  //  2. The user can edit like -100 -> delete 1 -> rawInput becomes -00 -> value becomes 0 -> reset rawInput to 0 -> weird UX
  if (parseFloat(rawInput.value) === newValue) return;
  if (newValue === undefined) {
    rawInput.value = '';
  } else {
    rawInput.value = newValue.toString();
  }
}, {
  immediate: true,
}); // Watch v-model

// FIXME: this causes a circular watch with value v-model, but it's currently fine as the circle ends because the watched values are set to the same value
watch(rawInput, (newValue) => {
  // We allow partially valid states because the user is typing...
  const numberRegex = PARTIAL_NUMBER_REGEX;
  if (numberRegex.test(newValue)) {
    /* Valid/Partially valid state */
    if (integer && newValue.includes('.')) return;
    const number = integer ? parseInt(newValue, 10) : parseFloat(newValue);
    if (Number.isNaN(number)) return; // Partial state: Do not set the v-model
    value.value = number;
  }
});

const inputSize = computed(() => {
  const lengths = [
    String(min ?? 0).length,
    String(max ?? 0).length,
  ];
  return Math.max(...lengths, 5);
});

const inputRef = ref<HTMLInputElement | null>(null);

function clamp (n: number): number {
  if (min !== undefined && n < min) return min;
  if (max !== undefined && max < n) return max;
  return n;
}

function increment () {
  if (value.value === undefined) {
    value.value = min;
    return;
  }
  value.value = clamp(value.value + step);
}

function decrement () {
  if (value.value === undefined) {
    value.value = max;
    return;
  }
  value.value = clamp(value.value - step);
}

function focus () {
  inputRef.value?.focus();
}

defineExpose({
  focus,
  increment,
  decrement,
  isInvalid: computed(() => effectiveState.value === NumberInputState.Error),
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.number-input {
  @apply inline-flex items-stretch rounded-md border border-solid;
  background: var(--_bg);
  border-color: var(--_border);
  transition: border-color var(--duration-normal) var(--ease-default);
}

.number-input:focus-within {
  @apply gui-info-border;
}

/* States */
.number-input[data-state="error"] {
  @apply gui-danger-border;
}
.number-input[data-state="warning"] {
  @apply gui-warning-border;
}
.number-input[data-state="success"] {
  @apply gui-success-border;
}

.number-input-field {
  @apply border-none outline-none bg-transparent font-mono flex-1 min-w-0;
  color: var(--_fg);
  -moz-appearance: textfield;
}

.number-input-field::-webkit-inner-spin-button,
.number-input-field::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input-field::placeholder {
  @apply gui-neutral-fg-muted opacity-50;
  font-size: var(--_placeholder-size);
}

.number-input-steppers {
  @apply pl-xs flex flex-col gui-neutral-border-subtle;
}

.number-input-stepper {
  @apply flex-1 inline-flex items-center justify-center cursor-pointer bg-transparent border-none gui-neutral-fg-muted px-xs rounded-sm;
  transition: color var(--duration-fast) var(--ease-default), background var(--duration-fast) var(--ease-default);
}

.number-input-stepper:hover:not(:disabled) {
  @apply gui-neutral-fg gui-neutral-bg-hover;
}

.number-input-stepper:disabled {
  @apply cursor-not-allowed opacity-30;
}

.number-input-stepper + .number-input-stepper {
  @apply border-t gui-neutral-border-subtle;
}

.number-input-stepper-icon {
  width: 10px;
  height: 10px;
}

/* Sizes */
.number-input-xs {
  @apply h-6 text-xs pl-xs;
  --_placeholder-size: var(--text-xs);
}
.number-input-sm {
  @apply h-7 text-sm pl-sm;
  --_placeholder-size: var(--text-xs);
}
.number-input-md {
  @apply h-8 text-md pl-sm;
  --_placeholder-size: var(--text-sm);
}
.number-input-lg {
  @apply h-9 text-lg pl-md;
  --_placeholder-size: var(--text-md);
}
.number-input-xl {
  @apply h-10 text-xl pl-md;
  --_placeholder-size: var(--text-lg);
}
}
</style>
