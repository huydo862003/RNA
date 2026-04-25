<template>
  <Tooltip
    v-if="$slots.popper"
    :id="id"
    class="g-tooltip-trigger"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-triggers="['hover']"
    :popper-class="`${popperClass} mt-1`"
  >
    <slot />
    <template
      #popper
    >
      <slot name="popper" />
    </template>
  </Tooltip>
  <slot
    v-else
  />
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  Tooltip,
} from 'floating-vue';
import {
  computed,
  getCurrentInstance,
  watchEffect,
} from 'vue';
import {
  getId,
} from '@hdnax/stdx';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
  placement = 'bottom',
  shown = undefined,
  arrow = true,
  triggers = [
    'hover',
    'focus',
  ],
} = defineProps<{
  id?: string;
  /** CSS classes applied to the popper element */
  class?: string;
  /** Inline styles applied to the popper element */
  style?: Record<string, string>;
  /** Positioning of the tooltip relative to the trigger */
  placement?: Placement;
  /** Programmatically show/hide the tooltip */
  shown?: boolean;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Events that trigger the tooltip */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
}>();

const popperUid = `g-tooltip-${getId(Tooltip, getCurrentInstance()!)}`; // A unique id so we can query the child of the current tooltip

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const popper = computed(() => document.querySelector(`.${popperUid}.v-popper__popper`));

// Apply inline styles to the teleported popper element
watchEffect(() => {
  const el = popper.value;
  if (!el || !_style) return;
  for (const [
    key,
    val,
  ] of Object.entries(_style)) {
    (el as HTMLElement).style.setProperty(key, val);
  }
});

defineExpose({
  popper,
});
</script>

<style>
@reference '@/style.css';

@layer components {
.g-tooltip-trigger {
  @apply inline;
}

.v-popper {
  @apply inline;
}

.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
