<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :class="[
      'switch',
      `switch-${size}`,
      { 'is-checked': modelValue, 'is-disabled': disabled },
      _class,
    ]"
    :style="{
      '--_solid': `var(--gui-${semantic}-solid)`,
      '--_solid-hover': `var(--gui-${semantic}-solid-hover)`,
      ..._style,
    }"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="switch-thumb" />
  </button>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  SwitchSize,
  SwitchSemantic,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
  modelValue = false,
  disabled = false,
  size = SwitchSize.Md,
  semantic = SwitchSemantic.Neutral,
} = defineProps<{
  id?: string;
  class?: string;
  style?: Record<string, string>;
  modelValue?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  semantic?: SwitchSemantic;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

function toggle (): boolean {
  if (disabled) return modelValue;
  const oldValue = modelValue;
  emit('update:modelValue', !modelValue);
  return oldValue;
}

function check (): boolean {
  const oldValue = modelValue;
  emit('update:modelValue', true);
  return oldValue;
}

function uncheck (): boolean {
  const oldValue = modelValue;
  emit('update:modelValue', false);
  return oldValue;
}

defineExpose({
  toggle,
  check,
  uncheck,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.switch {
  @apply relative inline-flex items-center border-none cursor-pointer;
  border-radius: var(--radius-full);
  background-color: var(--gui-neutral-bg-active);
  transition-property: background-color;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default);
}

.switch:hover {
  background-color: var(--gui-neutral-border-subtle);
}

.switch.is-checked {
  background-color: var(--_solid);
}

.switch.is-checked:hover {
  background-color: var(--_solid-hover);
}

.switch.is-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Thumb */
.switch-thumb {
  @apply block gui-neutral-bg;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-xs);
  transition-property: transform;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default);
}

/* Switch thumb = sizing token - 1 step (to not overlap with the track)
 * Switch width = 2 * thumb + 4px padding
 */
.switch-sm {
  width: calc(2 * var(--size-1) + 4px);
  height: var(--size-2);
  padding: 2px;
}

.switch-sm .switch-thumb {
  width: var(--size-1);
  height: var(--size-1);
}

.switch-sm.is-checked .switch-thumb {
  transform: translateX(var(--size-1));
}

.switch-md {
  width: calc(2 * var(--size-2) + 4px);
  height: var(--size-3);
  padding: 2px;
}

.switch-md .switch-thumb {
  width: var(--size-2);
  height: var(--size-2);
}

.switch-md.is-checked .switch-thumb {
  transform: translateX(var(--size-2));
}

.switch-lg {
  width: calc(2 * var(--size-3) + 4px);
  height: var(--size-4);
  padding: 2px;
}

.switch-lg .switch-thumb {
  width: var(--size-3);
  height: var(--size-3);
}

.switch-lg.is-checked .switch-thumb {
  transform: translateX(var(--size-3));
}
}
</style>
